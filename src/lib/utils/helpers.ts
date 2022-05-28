export const copyToClipboard = (text: string, successfully: () => void, failure: () => void) => {
    const clipboard = navigator.clipboard;
    if (clipboard !== undefined) {
        navigator.clipboard.writeText(text).then(successfully, failure);
    } else {
        if (document.execCommand) {
            const el = document.createElement('input');
            el.value = text;
            document.body.append(el);

            el.select();
            el.setSelectionRange(0, text.length);

            if (document.execCommand('copy')) {
                successfully();
            }

            el.remove();
        } else {
            failure();
        }
    }
};

export const checkBrowserCompatibility = async () => {
    if (!window.indexedDB) {
        throw Error(
            `Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.`
        );
    }
};
