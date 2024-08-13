# Sales Dashboard Application

## Project Overview
The Sales Dashboard Application is a React-based web application designed to visualize and analyze sales data through two distinct dashboards. Each dashboard presents graphical and tabular representations of sales data, categorized by product and category.

## Features

### Dashboard 1: Today's Sales
- **Graphs**:
  - **Product-Level Graph**: Displays sales figures for each product sold today using Chart.js.
  - **Category-Level Graph**: Shows total sales by category for today using Chart.js.
- **Table**:
  - **Columns**: Product name, Category, Quantity Sold, Sales Amount.
  - **Features**: Sorting, filtering, and pagination using AG Grid.

### Dashboard 2: Sales Comparison Between Two Dates
- **Graphs**:
  - **Product-Level Comparison**: Compares sales figures for each product between two selected dates using Chart.js.
  - **Category-Level Comparison**: Compares total sales by category between two selected dates using Chart.js.
- **Table**:
  - **Columns**: Product name, Category, Date 1 Sales Amount, Date 2 Sales Amount, Difference.
  - **Features**: Sorting, filtering, and pagination using AG Grid.
- **Date Selection**: Allows users to select dates for comparison using date pickers.

## Features

- **Date Selection**: Users can select dates for the comparison dashboard with date pickers.
- **Data Filtering**: Options to filter data by category and product, applied to both graphs and tables.
- **Responsive Design**: Ensures the dashboards are accessible and responsive on various devices.
- **API Integration**: Fetches data from a mock API or backend service to populate the graphs and tables.
- **Error Handling**: Handles API requests and data display issues with user-friendly error messages or loading indicators.

## Technical Stack

- **React**: Utilizes functional components and hooks (`useState`, `useEffect`).
- **Chart.js**: Implements charts for data visualization.
- **AG Grid**: Displays tabular data with sorting, filtering, and pagination.
- **React Router**: Provides navigation between different dashboards.
- **API Integration**: Fetches data from an external API or mock data.

## Setup and Usage

### Prerequisites
- Node.js (>=14.x)
- npm (>=6.x) or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/prathmeshshendarkar/InfyDashboard.git
2. Navigate to the project directory:
```cd InfyDashboard```
4. Install dependencies:
```
    npm install
```
4. Running the Application
To start the development server, run:
```
npm start
```
## Running the Application

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Deployment

The application is deployed on Netlify. You can access the live site at: [Netlify Deployment Link](https://master--infydashboard.netlify.app/)

## API Integration

The application fetches data from a mock API. The endpoint is defined in the source code and may be modified as needed.

## Error Handling

If the application encounters issues with data fetching or display, appropriate error messages or loading indicators are shown.

## Documentation

- **Setup and Installation**: Follow the instructions above to set up and run the project.
- **Usage**: Navigate between dashboards and use filters to interact with the data.
