from PIL import Image
import os


def knock_out(path_in, path_out, thresholds=((245, 235, 220), (250, 248, 240), (255, 255, 255)), softness=28):
    im = Image.open(path_in).convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            dists = [((r - tr) ** 2 + (g - tg) ** 2 + (b - tb) ** 2) ** 0.5 for tr, tg, tb in thresholds]
            d = min(dists)
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            warm_light = lum > 228 and abs(r - g) < 28 and abs(g - b) < 34 and r + 8 >= g >= b - 10
            if d < softness or warm_light:
                if d < softness * 0.5 or lum > 244:
                    alpha = 0
                elif warm_light and lum > 236:
                    alpha = int(max(0, min(180, (248 - lum) * 14)))
                else:
                    alpha = int(255 * min(1, d / softness))
                px[x, y] = (r, g, b, max(0, min(255, alpha)))
    im.save(path_out, "PNG")
    print(path_out, os.path.getsize(path_out))


assets = r"C:\Users\HARSHITH V MALIPATIL\.cursor\projects\c-Users-HARSHITH-V-MALIPATIL-OneDrive-Desktop-domo-3\assets"

knock_out(
    os.path.join(assets, "mysore-palace-lineart.jpg"),
    "public/mysore-palace-lineart.png",
    softness=38,
)
knock_out(
    os.path.join(assets, "mysore-jasmine-botanical.jpg"),
    "public/mysore-jasmine-botanical.png",
    softness=34,
)
knock_out(
    "public/heritage-crest-gold.jpg",
    "public/heritage-crest-gold.png",
    thresholds=((245, 235, 210), (250, 245, 230), (255, 255, 255)),
    softness=42,
)
print("done")
