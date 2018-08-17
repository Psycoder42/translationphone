module.exports= {
    "mode": "development",
    "entry": __dirname+'/src/app.js',
    "output": {
        "path": __dirname+'/public/dist',
        "filename": "[name].js"
    },
    "module": {
        "rules": [
            {
                "test": /\.(js|jsx)$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        "presets": [
                            "env",
                            "react"
                        ]
                    }
                }
            }
        ]
    }
}
