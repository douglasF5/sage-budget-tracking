import { colorScheme, setColorScheme } from "./storage.js";

const documentRoot = document.documentElement;
const colorSchemeController = document.querySelector('#colorSchemeController');
let currentScheme = '';

const colorSlots = {
    accent: {
        dark: '#BCFF05',
        light: '#118C01',
    },
    overAccent: {
        dark: '#91F002',
        light: '#3BB302',
    },
    onAccent: {
        dark: '#000000',
        light: '#FFFFFF',
    },
    negative: {
        dark: '#FF7E6E',
        light: '#B3181D',
    },
    caution: {
        dark: '#FFBD3D',
        light: '#AB5011',
    },
    surfacePrimary: {
        dark: '#000000',
        light: '#FFFFFF',
    },
    surfaceSecondary: {
        dark: '#111418',
        light: '#F3F5F7',
    },
    surfaceTertiary: {
        dark: '#191C21',
        light: '#E4E8ED',
    },
    surfaceQuaternary: {
        dark: '#262C33',
        light: '#D4DBE2',
    },
    onSurfacePrimary: {
        dark: '#FFFFFF',
        light: '#000000',
    },
    onSurfacePrimaryVariant: {
        dark: '#D4DBE2',
        light: '#3D444C',
    },
    onSurfaceSecondary: {
        dark: 'rgba(212, 219, 226, 0.7)',
        light: 'rgba(61, 68, 76, 0.7)',
    },
    onSurfaceTertiary: {
        dark: 'rgba(212, 219, 226, 0.5)',
        light: 'rgba(61, 68, 76, 0.5)',
    },
    onSurfaceQuaternary: {
        dark: 'rgba(212, 219, 226, 0.3)',
        light: 'rgba(61, 68, 76, 0.3)',
    },
    overSurfacePrimary: {
        dark: 'rgba(212, 219, 226, 0.12)',
        light: 'rgba(0, 0, 0, 0.12)',
    },
    overSurfaceSecondary: {
        dark: 'rgba(212, 219, 226, 0.08)',
        light: 'rgba(0, 0, 0, 0.08)',
    },
    overSurfaceTertiary: {
        dark: 'rgba(212, 219, 226, 0.04)',
        light: 'rgba(0, 0, 0, 0.04)',
    },
    modalOverlay: {
        dark: 'rgba(0, 0, 0, 0.7)',
        light: 'rgba(0, 0, 0, 0.5)',
    },
    textSelection: {
        dark: 'hsla(76, 100%, 51%, .24)',
        light: 'hsla(76, 100%, 51%, .24)',
    },
    focusVisible: {
        dark: 'hsla(76, 100%, 100%, .16)',
        light: 'hsla(76, 100%, 100%, .16)',
    },
    outlinePrimary: {
        dark: 'rgba(212, 219, 226, 0.24)',
        light: 'rgba(61, 68, 76, 0.24)',
    },
    outlineSecondary: {
        dark: 'rgba(212, 219, 226, 0.16)',
        light: 'rgba(61, 68, 76, 0.16)',
    },
    outlineTertiary: {
        dark: 'rgba(212, 219, 226, 0.12)',
        light: 'rgba(61, 68, 76, 0.12)',
    },
};

function setUpColorScheme() {
    if(colorScheme === null) {
        currentScheme = 'dark';
    } else {
        currentScheme = colorScheme;
    }

    toggleColorScheme(currentScheme);

    colorSchemeController.onclick = () => {
        if(currentScheme === 'dark') {
            currentScheme = 'light';
        } else {
            currentScheme = 'dark';
        }

        toggleColorScheme(currentScheme);
    }

    window.addEventListener('beforeunload', () => {
        setColorScheme(currentScheme);
    });
}

function keyToStyleProperty(key) {
    return '--c-' + key.replace(/([A-Z])/g, '-$&').toLowerCase();
}

function toggleColorScheme(preference) {
    for(let slot in colorSlots) {
        documentRoot.style.setProperty(keyToStyleProperty(slot), colorSlots[slot][preference]);
    };

    colorSchemeController.innerHTML = `
        <svg class="small-title__icon"><use xlink:href="assets/icons.svg#circle-lefthalf-fill-icon" /></svg>${preference === 'dark' ? 'Light' : 'Dark'} theme`;
}

export { setUpColorScheme };