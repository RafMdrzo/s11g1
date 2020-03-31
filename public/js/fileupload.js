FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
    
    );

FilePond.setOptions({
    stylePanelAspectRatio: 3/9,
    imageResizeTargetWidth: 640,
    imageResizeTargetHeight: 480
})
FilePond.parse(document.body)