// Function to fetch data from a JSON source
async function fetchCollegeData() {
    try {
        const response = await fetch('colleges.json'); // Replace with your JSON API endpoint
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching college data:', error);
        return []; // Return an empty array in case of an error
    }
}

// Function to extract labels and values from JSON
function processCollegeData(data) {
    const labels = data.map(college => college.name); // Extract names
    const values = data.map(college => college.registrations); // Extract counts
    return { labels, values };
}

// Function to generate dynamic HSL colors
function generateDynamicColors(count) {
    const colors = [];
    const hueStep = 360 / Math.min(count, 360); // Ensure evenly distributed hues

    for (let i = 0; i < count; i++) {
        const hue = Math.round(hueStep * i) % 360; // Cycle through hues (0–359)
        const saturation = 60 + (i % 10) * 4; // Vary saturation (60–100%)
        const lightness = 50 + (i % 7) * 5;  // Vary lightness (50–80%)
        colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }

    return colors;
}

// Function to render the pie chart
function renderPieChart(labels, values) {
    const ctx = document.getElementById('collegePieChart').getContext('2d');
    const colors = generateDynamicColors(labels.length); // Generate colors dynamically

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Registrations',
                data: values,
                backgroundColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

// Main function to initialize everything
async function init() {
    const collegeData = await fetchCollegeData(); // Fetch dynamic data
    if (collegeData.length > 0) {
        const { labels, values } = processCollegeData(collegeData);
        renderPieChart(labels, values); // Render the chart
    } else {
        console.error('No data available to display.');
    }
}

// Call the initialization function
init();
