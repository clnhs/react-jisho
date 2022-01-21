![](./public/logo.svg)

# React Jisho

React Jisho is meant as a portfolio project by @clnhs. Its purpose is to be a Japanese dictionary for quick reference and as gateway towards other resources. It is currently built on the API provided by the open-source project [Jotoba](https://github.com/WeDontPanic/Jotoba), which highly facilitates the integration of the most common free
Japanese learning resources, namely JMdic, KanjiDic, as well as parts of the Tatoeba Project.

For future improvements, bug reports (oops) and general feedback (thanks!), the Issues section is open to all.

The webapp is currently deployed at Vercel under the subdomain [https://react-jisho.vercel.app/](https://react-jisho.vercel.app/).

## Repository Branches
We have three main branches on this project:
1. `dev`, for, well, development work;
2. `main`, which holds the latest stable version;
4. `prod`, which is watched by Vercel for automated build & deployment;

## Stack

|                            Tech                            |                                                                                                                                              Fancy Logo                                                                                                                                               |
|:----------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|      [Jotoba](https://github.com/WeDontPanic/Jotoba)       |                                                                                                <img src="https://github.com/WeDontPanic/Jotoba/raw/dev/html/assets/jotokun/JotoBook.svg" height="70">                                                                                                 |
|         [React](https://github.com/facebook/react)         |                                                                                       <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png" height="60">                                                                                       |
|        [Next.js](https://github.com/vercel/vercel)         | <img src="https://camo.githubusercontent.com/92ec9eb7eeab7db4f5919e3205918918c42e6772562afb4112a2909c1aaaa875/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313630373535343338352f7265706f7369746f726965732f6e6578742d6a732f6e6578742d6c6f676f2e706e67" width="50"> |
| [TailwindCSS](https://github.com/tailwindlabs/tailwindcss) |                                                                                                 <img src="https://github.com/tailwindlabs/tailwindcss/raw/master/.github/logo-light.svg" width="250">                                                                                                 |
|     [Radix UI](https://github.com/radix-ui/primitives)     |                                                                                                                          <img src="https://i.imgur.com/2IKnbE4.png">                                                                                                                           |
| [React-Icons](https://github.com/react-icons/react-icons)  |                      <img src="https://camo.githubusercontent.com/48d099290b4cb2d7937bcd96e8497cf1845b54a810a6432c70cf944b60b40c77/68747470733a2f2f7261776769742e636f6d2f676f72616e67616a69632f72656163742d69636f6e732f6d61737465722f72656163742d69636f6e732e737667" width="50">                      |
|         [Vercel](https://github.com/vercel/vercel)         |       <img src="https://camo.githubusercontent.com/add2c9721e333f0043ac938f3dadbc26a282776e01b95b308fcaba5afaf74ae3/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313538383830353835382f7265706f7369746f726965732f76657263656c2f6c6f676f2e706e67" width="50">       |

## Running The Project

First, run the development server:

```bash
pnpm run dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.