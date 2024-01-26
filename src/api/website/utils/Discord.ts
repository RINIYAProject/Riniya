import fetch from "node-fetch"
import DiscordAccount from '@riniya.ts/database/Social/DiscordAccount'

export interface OAuthStruct {
  state: string;
  url: URL;
}

export interface OAuthOptions {
  userUUID: string;
}

export interface OAuthToken {
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
}

export interface DiscordClient {
  discordId: string;
  discordToken: string;
  discordSecret: string;
  discordRedirectURI: string;
}

export interface PartialUser {
  id: string;
  username: string;
  avatar: string;
  global_name: string;
  discriminator: number;
  email: string;
}

export interface PartialGuild {
  id: string;
  name: string;
}

export interface User {
  user: PartialUser;
  guilds: PartialGuild[];
}

export default class Discord {

  private static discordId: string = process.env["DISCORD_CLIENT_ID"];
  private static discordToken: string = process.env["DISCORD_CLIENT_TOKEN"];
  private static discordSecret: string = process.env["DISCORD_CLIENT_SECRET"];
  private static discordRedirectURI: string = process.env["DISCORD_REDIRECT_URI"];

  public static getDiscordClient(): DiscordClient {
    return {
      discordId: Discord.discordId,
      discordToken: Discord.discordToken,
      discordSecret: Discord.discordSecret,
      discordRedirectURI: Discord.discordRedirectURI
    }
  }

  public static async getOAuthUrl(options: OAuthOptions): Promise<OAuthStruct> {
    const defaultScope: string = 'identify email guilds guilds.join'

    const url = new URL('https://discord.com/api/oauth2/authorize');
    url.searchParams.set('client_id', Discord.discordId);
    url.searchParams.set('redirect_uri', Discord.discordRedirectURI);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('state', options.userUUID);

    url.searchParams.set('scope', defaultScope)
    url.searchParams.set('prompt', 'consent');

    return new Promise<OAuthStruct>(resolve => {
      resolve({
        state: options.userUUID,
        url: url
      })
    })
  }


  public static async getOAuthTokens(code: string): Promise<OAuthToken> {
    const url = 'https://discord.com/api/v10/oauth2/token';

    const body = new URLSearchParams({
      client_id: Discord.discordId,
      client_secret: Discord.discordSecret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: Discord.discordRedirectURI,
    });

    const response = await fetch(url, {
      body: body,

      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (response.ok) {
      return new Promise<OAuthToken>(async resolve => {
        resolve(await response.json())
      })
    } else {
      throw new Error(`Error fetching OAuth tokens: [${response.status}] ${response.statusText}`);
    }
  }

  public static async getAccessToken(userId: string, tokens: OAuthToken): Promise<OAuthToken> {
    if (Date.now() > tokens.expires_at) {
      const url = 'https://discord.com/api/v10/oauth2/token';
      const body = new URLSearchParams({
        client_id: Discord.discordId,
        client_secret: Discord.discordSecret,
        grant_type: 'refresh_token',
        refresh_token: tokens.refresh_token,
      });
      const response = await fetch(url, {
        body,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.ok) {
        const newTokens: OAuthToken = await response.json();
        newTokens.expires_at = Date.now() + newTokens.expires_in * 1000;

        await DiscordAccount.updateOne({ userId: userId }, { $set: { tokens: newTokens } });

        console.log("Updated token Old: " + tokens.access_token + " New: " + newTokens.access_token)

        return new Promise<OAuthToken>(resolve => {
          resolve(newTokens)
        });
      } else {
        throw new Error(`Error refreshing access token: [${response.status}] ${response.statusText}`);
      }
    }
    return new Promise<OAuthToken>(resolve => {
      resolve(tokens)
    });
  }


  public static async getUserData(tokens: OAuthToken): Promise<User> {
    const url = 'https://discord.com/api/v10/oauth2/@me';
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
      },
    });
    if (response.ok) {
      return new Promise<User>(async resolve => {
        const data: User = await response.json();
        resolve(data)
      })
    } else {
      throw new Error(`Error fetching user data: [${response.status}] ${response.statusText}`);
    }
  }
}
