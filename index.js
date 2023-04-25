const inquirer = require('inquirer')
const fs = require('fs')

inquirer
    .prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Please enter 3 characters.'
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'What text color would you like?'
        },
        {
            type: 'list',
            name: 'shape',
            message: 'What shape would you like to choose?',
            choices: ['triangle', 'circle', 'square']
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'What color shape would you like?'
        }
    ])
    .then((answer) => {
        if (answer.text.length > 3) {
            console.error('Must be 3 characters long or less')
            return
        }

        // Deconstruct the object answers into variables
        const { text, textColor, shape, shapeColor} = answer

        // Make the svg details below
        let details = ''
        if (shape === 'triangle') {
            details = 
            `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                <polygon points="150,20 280,180 20,180" fill="${shapeColor}" />
                <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
            </svg>
            `
        } else {
            details = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <${shape} cx="150" cy="100" r="80" fill="${shapeColor}" />
            <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
        </svg>
        `
        }
        

        // Write file to local drive
        fs.writeFile('./logo.svg', details, (err) => {
            (err?console.error(err):console.log('Generated logo.svg'))
        })

        
        
          
    })
    
    