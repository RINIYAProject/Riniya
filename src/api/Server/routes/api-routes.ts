/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   api-routes.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/29 13:56:14 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/06 21:48:31 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Riniya from "@riniya.ts";
import AbstractRoutes from "../../Server/AbstractRoutes";

import { Client as TwitterClient } from "twitter-api-sdk"
import { OAuth2User } from "twitter-api-sdk/dist/OAuth2User";
import { v4 } from "uuid";

const authClient = new OAuth2User({
    client_id: process.env['TWITTER_CLIENT_ID'] || "no_id",
    client_secret: process.env['TWITTER_SECRET'] || "no_secret",
    callback: 'https://api.ghidorah.uk/api/callback',
    scopes: [
        'block.read', 'mute.read',
        'block.write', 'mute.write',
        'tweet.write'
    ]
});

const client = new TwitterClient(authClient);

export default class ApiRoutes extends AbstractRoutes {
    public register() {
        this.router.get('/commands', async (req, res) => {
            res.status(200).json({
                status: true,
                data: Riniya.instance.manager.toList() || []
            })
        })

        this.router.get('/invite', async (req, res) => {
            res.status(200).json({
                status: true,
                data: {
                    invite_url: `https://discord.com/api/oauth2/authorize?client_id=${Riniya.instance.application.id}&permissions=8&scope=bot`
                }
            })
        })

        this.router.get('/authorize', async (req, res) => {
            res.redirect(authClient.generateAuthURL({
                state: '',
                code_challenge_method: "s256" 
            }));
        })

        this.router.post('/callback', async (req, res) => {
            
        })
    }
}