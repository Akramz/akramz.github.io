---
title: How to Patchify & Index Overlapping Satellite Images
last_modified_at: 2024-02-24
---
Overlapping satellite images are difficult to index after [patchify](https://pypi.org/project/patchify/)-cation since the intersecting area patches will produce [Hash collisions](https://en.wikipedia.org/wiki/Hash_collision). This makes batch creation for deep learning challenging. We encounter this issue when processing multi-sensor data or stacked temporal images that cover the same region.

In the case of temporal datasets, there are two solutions that come to mind:
1. Add a temporal index into the data samplers.
2. Shift the the images randomly before using a standard sampler ([TorchGeo](https://github.com/microsoft/torchgeo)).

In this post, I share code for randomly shifting & saving a new version of an existing satellite image:

```python
def generate_shift(radius, gap):
    """
    Generate a random shift within specified bounds, avoiding a central gap.
    
    Parameters:
    radius (float): The half-width of the range from which to generate the shift. The total range will be [-radius, -gap] and [gap, radius].
    gap (float): The half-width of the central range to avoid. The total gap will be [-gap, gap].

    Returns:
	float: A randomly generated shift value.
    """
    # Validate that gap is smaller than radius
    if gap >= radius:
        raise ValueError("Gap must be smaller than radius.")

    # Define the ranges avoiding the gap
    range1 = (-radius, -gap)
    range2 = (gap, radius)

    # Randomly choose one of the ranges
    chosen_range = range1 if np.random.random() < 0.5 else range2

    # Generate a random number within the chosen range
    return np.random.uniform(chosen_range[0], chosen_range[1])

def shift_image(img_path, new_img_path, gap, radius):
    """
    Shifts the reference image randomly and saves the shifted image.

    Parameters:
    img_path (str): Path to the original reference image.
    new_img_path (str): Path to save the shifted image.
    gap (float): The half-width of the central gap to avoid in the shift.
    radius (float): The half-width of the range from which to generate the shift.
    """
    with rasterio.open(img_path) as src:
        meta = src.meta.copy()

        # Calculate random x and y shifts in meters
        shift_x = generate_shift(radius, gap)
        shift_y = generate_shift(radius, gap)

        # Get the bounds of the image
        bounds = src.bounds
        window = window_from_bounds(bounds.left, bounds.bottom, bounds.right, bounds.top, src.transform)
        shifted_image = src.read(window=window)

        # Update the metadata with the new transform for shifted image
        shifted_transform = rasterio.Affine(
            meta['transform'].a,
            meta['transform'].b,
            meta['transform'].c - shift_x,
            meta['transform'].d,
            meta['transform'].e,
            meta['transform'].f - shift_y
        )

        shifted_meta = meta.copy()
        shifted_meta.update({
            "transform": shifted_transform,
            "width": int(window.width),
            "height": int(window.height)
        })

        # Write the shifted image to a new file
        with rasterio.open(new_img_path, "w", **shifted_meta) as dst:
            dst.write(shifted_image)
            dst.build_overviews([4, 16, 64], rasterio.enums.Resampling.average)
            dst.update_tags(ns="rio_overview", resampling="average")
```

The above function also supports adding a `gap` to avoid nearby shifting if we assume a high-density of images in the original ROI.