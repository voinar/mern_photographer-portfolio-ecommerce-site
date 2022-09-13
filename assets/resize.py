#'C:\\Users\\zzx\\Desktop\\urodziny_jacka_33'

from PIL import Image
import glob, os

size = 1440, 2560
folder = open (os.path.expanduser(r"/Users/voinar/Documents/react_photographer-portfolio/assets/STRONKA/BIEGI/*.*"))
count = 00

for infile in glob.glob(folder):
    file, ext = os.path.splitext(infile)
    im = Image.open(infile)
    im.thumbnail(size)
    im.save(str(count) + "_biegi" + ".jpg", "JPEG")
    count = count + 1
    print(str(count))


#import os
#path = (r"C:/Users/zzx/Desktop/urodziny_jacka_33/")
#files = os.listdir(path)

#for index, file in enumerate(files):
#    os.rename(os.path.join(path, file), os.path.join(path, '_urodziny_33 _jacka_2020_06'.join([str(index), '.jpg'])))