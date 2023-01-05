# leaflet-challenge
This is Kokila's Leaflet challenge

# Part 1: Create the Earthquake Visualization
* First task is to visualize an earthquake dataset. Complete the following steps:
    * Get the dataset. Follow these steps:

        * The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON Feed Links to an external site.page and choose all-week dataset to visualize.
        * When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization.

* Import and visualize the data by doing the following:

    * Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

        * Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.

        * Hint: The depth of the earth can be found as the third coordinate for each earthquake.

    *Include popups that provide additional information about the earthquake when its associated marker is clicked.

    * Create a legend that will provide context for your map data.

    * Your visualization should look something like the preceding map.

# Part 2: Gather and Plot More Data (Optional with no extra points earning)
* Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in this dataset and visualize it alongside your original data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplates Links to an external site..
* Perform the following tasks:

    * I plotted the tectonic plates dataset on the map in addition to the earthquakes.

    * I added other base maps to choose from.

    * I put each dataset into separate overlays that can be turned on and off independently.

    * I add layer controls to your map.