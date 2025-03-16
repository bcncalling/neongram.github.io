document.addEventListener('DOMContentLoaded', () => {
    fetch('data.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

            // Populate version and date
            const project = xmlDoc.getElementsByTagName('project')[0];
            document.getElementById('version').textContent = project.getAttribute('version');
            document.getElementById('date').textContent = project.getAttribute('date');

            // Overview
            const overview = xmlDoc.getElementsByTagName('overview')[0];
            document.getElementById('overview').innerHTML = `<h2>Overview</h2><p>${overview.getElementsByTagName('description')[0].textContent}</p>`;

            // Modules
            const modules = xmlDoc.getElementsByTagName('module');
            let modulesHtml = '<h2>Modules</h2>';
            for (let module of modules) {
                modulesHtml += `
                    <div class="module">
                        <h3>${module.getAttribute('name')}</h3>
                        <p>${module.getElementsByTagName('description')[0].textContent}</p>
                        <ul>`;
                const features = module.getElementsByTagName('feature');
                for (let feature of features) {
                    modulesHtml += `<li>${feature.textContent}</li>`;
                }
                modulesHtml += `</ul></div>`;
            }
            document.getElementById('modules').innerHTML = modulesHtml;

            // Setup
            const setup = xmlDoc.getElementsByTagName('setup')[0];
            let setupHtml = '<h2>Setup</h2><ol>';
            const steps = setup.getElementsByTagName('step');
            for (let step of steps) {
                setupHtml += `<li class="step">${step.textContent}</li>`;
            }
            setupHtml += '</ol>';
            document.getElementById('setup').innerHTML = setupHtml;

            // Future Plans
            const future = xmlDoc.getElementsByTagName('future')[0];
            let futureHtml = '<h2>Future Plans</h2><ul>';
            const plans = future.getElementsByTagName('plan');
            for (let plan of plans) {
                futureHtml += `<li class="plan">${plan.textContent}</li>`;
            }
            futureHtml += '</ul>';
            document.getElementById('future').innerHTML = futureHtml;
        })
        .catch(error => console.error('Error loading XML:', error));
});
