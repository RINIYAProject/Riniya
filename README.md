<p align="center">
    <img src="https://cdn.discordapp.com/attachments/753743737901023242/1075359964517896192/github-header-image1.png" alt="Banner" />
    <a href="https://discord.gg/tnu9B47Tqx"><img src="https://img.shields.io/badge/Discord-5764F4?&style=flat-square&logo=Discord&logoColor=white" alt="Discord" /></a>
    <a href="https://ko-fi.com/vakea"><img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FF5E5B?&style=flat-square&logo=ko-fi&logoColor=white" alt="Ko-fi" /></a>
    <a href="mailto:farfy.dev@gmail.com"><img src="https://img.shields.io/badge/Email-181717.svg?style=flat-square&logo=GMail&logoColor=white" alt="Mail" /></a>
    <a href="https://www.riniya.uk"><img src="https://img.shields.io/badge/Website-181717?&style=flat-square&logo=Slashdot&logoColor=white" alt="Website" /></a>
</p>

<p align="center">
    <a href="https://docs.riniya.uk"><img src="https://img.shields.io/badge/Documentations-9766F5?&style=flat-square&logo=Json&logoColor=white" alt="Documentations" /></a>
    <a href="https://api.riniya.uk"><img src="https://img.shields.io/badge/API-9766F5?&style=flat-square&logo=smart&logoColor=white" alt="API" /></a>
    <a href="https://status.riniya.uk"><img src="https://img.shields.io/badge/Status-9766F5?&style=flat-square&logo=skynet&logoColor=white" alt="Website" /></a>
</p>

Hey, here's the bot discord, which includes the backend and the entire bot base.
 
#### How do I use it?
It's very simple. All you need is git, a MongoDB server and Redis, and you need an SSL certificate if you want to use the backend.

#### Without docker
```
git clone git@github.com/RINIYAProject/Riniya.git
cd Riniya/
mkdir logs
# Don't forget to re-install typescript dev version
# Otherwise you will not be able to launch via tsc
npm i -D typescript
yarn && yarn run start
```

#### Using Docker
```
docker pull ghcr.io/RINIYAProject/Riniya
# Don't forget to create your .env
docker run RINIYAProject/Riniya 
```

#### The .env file is required to run the bot.
#### Required variables
```env
TOKEN=<your discord token>
MONGODB=<your mongodb url>
SERVER_KEY=<the path of your ssl certificate private key>
SERVER_CERT=<the path of your ssl certificate public key>
REDIS_URL=<your redis host url>
TWITTER_TOKEN=<your twitter api key>
DISCORD_CLIENT_ID=<client-id>
DISCORD_CLIENT_TOKEN=<client-token>
DISCORD_CLIENT_SECRET=<client-secret>
DISCORD_REDIRECT_URI=<redirect-uri>
```

#### Optional variables
```env
VERSION=<your build version>
REVISION=<your revision code>
DEBUG=<true or false if you need to debug the app> 
```

#### Docker variables
```env
# This is to create the user of your database.
# Never change those data after the first launch!
MONGO_INITDB_ROOT_USERNAME=<your database username>
MONGO_INITDB_ROOT_PASSWORD=<your database password>
ME_CONFIG_MONGODB_URL=mongodb://<username>:<password>@database:27017/
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
1. The verification system

#### Progression
- [X] The verification system
- [X] Select menu self roles
- [X] The backend
- [X] The websocket
- [X] Dashboard & Front website
- [ ] Giveaways system
- [X] Authentication API
- [ ] Level & Economy system
- [ ] The fur-sona profile
- [X] The file bucket server
- [ ] Context menus
- [X] All base commands
- [X] Database improvement
- [X] Code optimisation & refactor
- [X] Fixing TSC warnings
- [ ] Customized commands
- [ ] Customized verification form

#### Advices
For web applications, you need to use HAProxy to distribute the network correctly.
For security reasons, you must also use a separate server for the databases.
We recommend to use Nginx Proxy Manager with docker.

#### Disclaimers
This project is licensed under the GNU-GPLv3 license. You must respect the license and guidelines to use this project. 
No commercial use is allowed, you must upload your sources publicly under the same license and author if you use this project. 
You may not remove the author's header/contributor's name from the code.
You may not add yourself to the list of authors. You are only allowed to appear in the list of contributors if you have made a pull request on the official repository.
Please do not change the copyright header inside our web-application, You need to refer this repository.

### Visitors:
<img src="https://visitor-badge.laobi.icu/badge?page_id=RINIYAProject&left_color=black&right_color=black&left_text=Visitors" alt="visitors"/>
