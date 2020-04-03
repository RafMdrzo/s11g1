FilePond.registerPlugin( FilePondPluginImagePreview);
FilePond.registerPlugin(FilePondPluginImageResize);
FilePond.registerPlugin(FilePondPluginFileEncode);

FilePond.setOptions({
    imagePreviewHeight: 250,
    imageResizeTargetWidth: 640,
    imageResizeTargetHeight: 480
})
FilePond.parse(document.body)