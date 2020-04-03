FilePond.registerPlugin(
    FilePondImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
    );

FilePond.setOptions({
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 100
});

FilePond.parse(document.body);