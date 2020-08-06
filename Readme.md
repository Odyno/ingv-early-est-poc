<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Odyno/ingv-early-est-poc">
    <img src="doc/imgs/POC.png" alt="Logo" width="200px">
  </a>
  <h2 align="center">Early-Est Arch Proof Of Concept</h2>
  <p align="center">
    Proof Of Concept for Data management & Realtime data display
    <br />
    <!--a href="https://github.com/Odyno/ingv-early-est-poc"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Odyno/ingv-early-est-poc">View Demo</a>
    ·-->
    <a href="https://github.com/Odyno/ingv-early-est-poc/issues">Report Bug</a>
    ·
    <a href="https://github.com/Odyno/ingv-early-est-poc/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
<!-- - [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
<!-- - [Acknowledgements](#acknowledgements) -->

<!-- ABOUT THE PROJECT -->

## About The Project

<p align="center">
    <a href="doc/imgs/POC.png" alt="Schema" target="_new">
        <img src="doc/imgs/POC.png" alt="Schema" width="90%">
    </a>
</p>

The purpose of this project is to create an example of an infrastructure that can handle seismic events in real time. The idea is to show the feasibility of an architecture that must be extendible, scalable and agnostic.

The use case is the realization of realtime data management & realtime data display of seismic events from the realtime system known as [Early-Est](http://early-est.rm.ingv.it/warning.html).

Is used [Apache Kafka](https://kafka.apache.org/), a (and not only) consolidated pattern of publish/subscribe on a modern and scalable infrastructure. Some of the features that [Apache Kafka](https://kafka.apache.org/) is able to provide natively for this POC are:

- The possibility to enter input data as a direct flow or as offline bulk. Those who will use the data will use a data stream and will not be influenced by the intrinsic characteristics of the data source.

- The possibility to create pipelines with unrelated actors. Each step of the pipeline produces/enriches/reduces the data and makes it available without knowing who will use it later.

- Polyglot architecture. There are different ways to query Kafka: there are libraries in C#, Java, C, Python and more. The ecosystem could also provide REST proxy that allows integration via HTTP and JSON.
- Kafka is scalable. Thanks to a distributed architecture and a proper configuration it is possible to scale on multiple nodes without downtime.

The setup of this architecture is based on a single kafka broker, running through Docker CE.
The applications can be created and run independently from the language and execution environment: for simplicity in this POC they are all NodeJS applications.

### Built With

The main frameworks used:

- [Docker CE](https://docs.docker.com/)
- [NodeJS](https://nodejs.org/)

<!-- GETTING STARTED -->

## Getting Started

To get a working local copy, follow these simple example steps.

### Prerequisites

The things needed to use the software are:

- Docker: follow the guide https://docs.docker.com/get-docker/
- npm : follow the guide https://nodejs.org/it/

### Installation

1. Clone the repo

```sh
git clone https://github.com/your_username_/Project-Name.git
```

2. Run the Kafka Environment via docker-compose

```sh
docker-compose -f env/docker-compose.yml -d
```

3. Foreach Modules you can run the follow commands:

   - Install the library/depency `npm install`
   - Per eseguire il servizio `npm start`
   - Per sviluppare il servizio `npm run dev`

<!-- USAGE EXAMPLES -->

## Usage

The documentation in in progress, For more examples, please refer to the buildig in progress [Documentation](https://www.staniscia.net)

<!-- ROADMAP --

## Roadmap

See the [open issues](https://github.com/Odyno/ingv-early-est-poc/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Alessandro Staniscia - [@alexstani](https://twitter.com/alexstani) - alessandro @ staniscia.net - https://www.staniscia.net

Project Link: [https://github.com/Odyno/ingv-early-est-poc](https://github.com/Odyno/ingv-early-est-poc)

<!-- ACKNOWLEDGEMENTS --

## Acknowledgements

- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Img Shields](https://shields.io)
- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Pages](https://pages.github.com)
- [Animate.css](https://daneden.github.io/animate.css)
- [Loaders.css](https://connoratherton.com/loaders)
- [Slick Carousel](https://kenwheeler.github.io/slick)
- [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
- [Sticky Kit](http://leafo.net/sticky-kit)
- [JVectorMap](http://jvectormap.com)
- [Font Awesome](https://fontawesome.com)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=flat-square
[contributors-url]: https://github.com/Odyno/ingv-early-est-poc/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=flat-square
[forks-url]: https://github.com/Odyno/ingv-early-est-poc/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=flat-square
[stars-url]: https://github.com/Odyno/ingv-early-est-poc/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/Odyno/ingv-early-est-poc/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/Odyno/ingv-early-est-poc/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/stanisciaalessandro
