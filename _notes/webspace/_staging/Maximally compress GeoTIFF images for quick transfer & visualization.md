---
title: Maximally compress GeoTIFF images for quick transfer & visualization
last_modified_at: 2024-03-10
---
Large satellite images can be difficult to transfer or visualize depending on internet speed and specs. This may result in slow data transfer/inspection/visualization when conducting data processing from a VM or attempting to share the imagery.

As we iterate on the data processing pipeline, we can minimize the resulting `GeoTIFF` using the following simple techniques:
- Select one band.
- Coarsen the resolution `N` times.
- Use JPEG 2000 compression.
- Use `uint8` data type.

I share a function that takes an input image path, applies the above steps, and saves the resulting image:

```python
def compress_image(in_path, out_path, res_factor=5):
    """
    Compresses and resamples a raster image, saving the result in JPEG 2000 format.

    This function takes an input raster file, resamples it by a specified factor, and compresses it using JPEG 2000. It is designed to work on the first band of the input raster. If the original data is not uint8, the function performs min-max normalization and converts it to uint8 before saving.

    Parameters:
	    - in_path (str or Path): Path to the input raster file.
	    - out_path (str or Path): Path where the output raster file will be saved.
	    - res_factor (int): The factor by which to coarsen the resolution of the image. For example, a `res_factor` of 5 will reduce both the width and height of the image by a factor of 5. Default is 5.

    Returns:
    - None. The result is saved to the `out_path` as a JPEG 2000 compressed image.
    """
    # Convert to pathlib.Path
    in_path = Path(in_path)
    out_path = Path(out_path)

    # Verify that the input file exists
    assert in_path.exists(), "The input file does not exist."
    
    # Open the source image
    with rasterio.open(in_path) as src:
        # Calculate the new resolution
        new_width = src.width // res_factor
        new_height = src.height // res_factor
        
        # Read the data from the first band and resample it
        data = src.read(
            1, 
            out_shape=(
                new_height,
                new_width
            ),
            resampling=Resampling.nearest
        )
        
        # Update the transformation for the new resolution
        transform = src.transform * src.transform.scale(
            (src.width / data.shape[-1]),
            (src.height / data.shape[-2])
        )
        
        # Prepare new metadata for the output file
        out_meta = src.meta.copy()
        out_meta.update(
            driver="JP2OpenJPEG",
            height=new_height,
            width=new_width,
            transform=transform,
            compress="JPEG 2000",
            dtype="uint8",
            count=1,
        )
        
        # If the original data is not uint8, conduct min-max normalization and convert to uint8
        if src.dtypes[0] != 'uint8':
            data = (data - data.min()) / (data.max() - data.min()) * 255
            data = data.astype("uint8")

    # Write the resampled data to the output file
    with rasterio.open(out_path, "w", **out_meta) as dest:
        dest.write(data, 1)
```

Notes:
- If the input raster's data type is not `uint8`, min-max normalization is applied to convert the data. This may lead to a loss of information, especially if the original data contains a wide range of values.
- The function does not explicitly handle `nodata` values during resampling and normalization. 
- If `nodata` values are present, they may affect the normalization calculation and result in altered `nodata` representations in the output.
