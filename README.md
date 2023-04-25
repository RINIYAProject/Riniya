<p align="center">
    <img src="https://cdn.discordapp.com/attachments/753743737901023242/1075359964517896192/github-header-image1.png" alt="Banner" />
    <a href="https://discord.gg/Dc5jmZAtG3"><img src="https://img.shields.io/badge/Discord-5764F4?&style=flat-square&logo=Discord&logoColor=white" alt="Discord" /></a>
    <a href="https://ko-fi.com/vakea"><img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FF5E5B?&style=flat-square&logo=ko-fi&logoColor=white" alt="Ko-fi" /></a>
    <a href="mailto:farfy.dev@gmail.com"><img src="https://img.shields.io/badge/Email-181717.svg?style=flat-square&logo=GMail&logoColor=white" alt="Mail" /></a>
    <a href="https://ghidorah.uk/"><img src="https://img.shields.io/badge/Website-181717?&style=flat-square&logo=Slashdot&logoColor=white" alt="Website" /></a>
</p>

Hey, there is the discord bot, this include the backend and all the bot base.
 
#### How do I use it?
Well, it's simple. All you need is git, a MongoDB server and Redis, and you need a SSL Certificate if you are willing to use the Backend.

```
git clone git@github.com/RINIYAProject/Riniya.git
cd Riniya/
yarn && yarn run start
```

#### The .env is necessary to run the bot.
#### Required variables
```env
TOKEN=<your discord token>
MONGODB=<your mongodb url>
SERVER_KEY=<the path of your ssl certificate private key>
SERVER_CERT=<the path of your ssl certificate public key>
REDIS_URL=<your redis host url>
TWITTER_TOKEN=<your twitter api key>
```

#### Optional variables
```env
VERSION=<your build version>
REVISION=<your revision code>
DEBUG=<true or false if you need to debug the app> 
```

#### Command available flags:
```
isDeveloper = The command is reserved only for the peoples inside the developer list.
isNSFW = The command need to be executed inside a NSFW channel.
isProtected = The command will need the permission 'MODERATE_MEMBERS' to use it
```

#### Button available flags:
```
isDynamic = The button will only interact with the target user.
isProtected = The button will only interact with the peoples inside the developer list.
```

#### The features that need to be improved
1. The express backend
2. The command registry
3. The api authentication middleware
4. Removing the useless code
5. Clearing the unused library from yarn
6. The verification system

#### Progression
- [X] The verification system
- [X] Select menu self roles
- [X] The backend
- [X] The websocket
- [ ] Dashboard & Front website
- [ ] Giveaways system
- [X] Authentication API
- [ ] Level & Economy system
- [ ] The fursona profile
- [X] The file bucket server
- [ ] The minecraft redis messager
- [ ] Context menus
- [X] All base commands
- [X] Database improvement
- [X] Code optimisation & refactor
- [X] Fixing TSC warnings

#### Disclaimers
This project is under the GNU-GPLv3 license. You must follow the license and guidelines to use this project. 
No commercial usage is allowed, You must upload your source publically under the same license and author. if you are using this project. 
You cannot remove the Author header / Contributor name inside the code.
You cannot add you in the author list. You are only allowed to be in the contributor list if you did a pull request on the official repository.

### Visitors:
<img src="https://visitor-badge.laobi.icu/badge?page_id=RINIYAProject&left_color=black&right_color=black&left_text=Visitors" alt="visitors"/>
