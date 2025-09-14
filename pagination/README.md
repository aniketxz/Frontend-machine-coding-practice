# Pagination Component
- ## Type 1:
    We have all the data, and we want to show limited data per page.
- ## Type 2:
    We have large data, but we fetch only limited data, based on number of items per page.
    Fetch data everytime user switches to new page.

## Features:
- User can change page by clicking Next, Previous, First and Last button
- User can change number of items shown per page
- User has page number options [1, 2, 3, 4, 5] and it changes page number on click
- At a given time only 5 buttons is visible, [curr-2, curr-1, curr, curr+1, curr+2]
- Current page number button is highlighted
- Disabled buttons on boundary cases

# To be fixed: page number buttons in PaginationType2