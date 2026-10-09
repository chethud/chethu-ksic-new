from PIL import Image
import numpy as np
from collections import deque
import os

assets = r"C:\Users\HARSHITH V MALIPATIL\.cursor\projects\c-Users-HARSHITH-V-MALIPATIL-OneDrive-Desktop-domo-3\assets"
public = r"c:\Users\HARSHITH V MALIPATIL\OneDrive\Desktop\domo 3\public"


def is_bg(r, g, b, lum_cut=198):
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    chroma = max(abs(r - g), abs(g - b), abs(r - b))
    # cool paper gray / white / warm ivory
    if lum >= lum_cut and chroma <= 18:
        return True
    if r > 238 and g > 234 and b > 220:
        return True
    if lum >= 220 and chroma <= 28 and r + 14 >= g:
        return True
    return False


def knockout(path_in, path_out, lum_cut=198, grow=3, soft_fill=True, keep_dark_max=170):
    im = Image.open(path_in).convert("RGBA")
    a = np.array(im)
    h, w = a.shape[:2]
    rgb = a[:, :, :3].astype(np.int16)
    lum = (0.299 * rgb[:, :, 0] + 0.587 * rgb[:, :, 1] + 0.114 * rgb[:, :, 2]).astype(np.float32)
    chroma = np.maximum(
        np.maximum(np.abs(rgb[:, :, 0] - rgb[:, :, 1]), np.abs(rgb[:, :, 1] - rgb[:, :, 2])),
        np.abs(rgb[:, :, 0] - rgb[:, :, 2]),
    )
    bg = ((lum >= lum_cut) & (chroma <= 22)) | (
        (rgb[:, :, 0] > 238) & (rgb[:, :, 1] > 234) & (rgb[:, :, 2] > 220)
    )

    mask = np.zeros((h, w), dtype=bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if bg[y, x]:
                mask[y, x] = True
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if bg[y, x] and not mask[y, x]:
                mask[y, x] = True
                q.append((x, y))
    while q:
        x, y = q.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and bg[ny, nx] and not mask[ny, nx]:
                mask[ny, nx] = True
                q.append((nx, ny))

    try:
        from scipy import ndimage

        mask = ndimage.binary_dilation(mask, iterations=grow)
    except Exception:
        pass

    alpha = np.full((h, w), 255, dtype=np.float32)
    alpha[mask] = 0
    if soft_fill:
        # palace: fade remaining pale paper fills; keep dark/gold linework
        soft = (~mask) & (lum > keep_dark_max) & (chroma < 28)
        alpha[soft] = np.clip((keep_dark_max + 40 - lum[soft]) * 8.0, 0, 255)
        line = (~mask) & ((lum < keep_dark_max) | (chroma > 24))
        alpha[line] = 255

    a[:, :, 3] = alpha.astype(np.uint8)
    out = Image.fromarray(a)
    out.save(path_out, "PNG")
    aa = np.array(out)
    print(
        os.path.basename(path_out),
        out.size,
        "cornerA",
        int(aa[0, 0, 3]),
        int(aa[0, -1, 3]),
        int(aa[-1, 0, 3]),
        int(aa[-1, -1, 3]),
        "meanA",
        round(float(aa[:, :, 3].mean()), 1),
        "opaque%",
        round(100 * float((aa[:, :, 3] > 20).mean()), 1),
    )


if __name__ == "__main__":
    knockout(
        os.path.join(assets, "mysore-palace-lineart-v2.jpg"),
        os.path.join(public, "mysore-palace-lineart.png"),
        lum_cut=196,
        grow=3,
        soft_fill=True,
        keep_dark_max=168,
    )
    knockout(
        os.path.join(assets, "mysore-jasmine-botanical-v2.jpg"),
        os.path.join(public, "mysore-jasmine-botanical.png"),
        lum_cut=198,
        grow=2,
        soft_fill=False,
    )
    print("done")
