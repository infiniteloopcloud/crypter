const config = {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        extend: {
            colors: {
                primary: {
                    100: '#d3d2e3',
                    200: '#a8a4c7',
                    300: '#7c77aa',
                    400: '#51498e',
                    500: '#251c72',
                    600: '#1e165b',
                    700: '#161144',
                    800: '#0f0b2e',
                    900: '#070617'
                },
                secondary: {
                    50: '#EDFDFC',
                    100: '#DBFBF9',
                    200: '#B2F6F2',
                    300: '#8DF1EC',
                    400: '#69EDE6',
                    500: '#42E8E0',
                    600: '#1AD6CC',
                    700: '#139F98',
                    800: '#0D6964',
                    900: '#073734'
                }
            },
            fontFamily: {
                SpaceGrotesk: ['Space Grotesk', 'sans-serif']
            }
        }
    },

    plugins: [require('@tailwindcss/forms')]
};

module.exports = config;
