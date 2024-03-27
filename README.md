# Admin-Dashboard -- React Project with D3.js Charts

This project utilizes React.js along with the D3.js library to create dynamic charts based on data fetched from the backend. The charts can be dynamically generated based on various filter options.

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This React project aims to provide a user-friendly interface for visualizing data fetched from a backend server. It leverages D3.js, a powerful data visualization library, to create various types of charts such as bar charts, line charts, pie charts, etc. The charts are dynamically generated based on the fetched data and user-selected filter options.

## Installation

To run this project locally, follow these steps:

1. Clone this repository to your local machine:

```bash
git clone https://github.com/SachinMondal/AdminDashboard-Frontend.git
```

2. Navigate to the project directory:

```bash
cd AdminDashboard-Frontend
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

5. Open your browser and visit `http://localhost:3000` to view the application.

## Usage

Once the application is running, you can interact with it to visualize the data using different charts and filter options:

- Select the Region to get the Data speciliased to your filter.
- Choose the data stat_year to get an overview of the density of company started per year , sector wise etc.
- The chart will be dynamically generated based on the selected options.

## Features

- **Dynamic Chart Generation:** Generates charts dynamically based on user-selected options and fetched data, supporting various types like bar, line, and pie charts.
- **Filter Options:** Allows users to customize displayed data via filter options with 80% much faster, including data sources and additional parameters.
- **Data Fetching:** 100% Real-time fetching from the backend ensures up-to-date charts reflecting the latest information.
- **User-Friendly Interface:** Provides an intuitive interface for easy chart interaction, with smooth navigation for an enhanced user experience.
make them proper

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or improvements, feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE).
