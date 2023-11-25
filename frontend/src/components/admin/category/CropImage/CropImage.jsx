import { Button } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Dialog, Transition } from "@headlessui/react";

const CropImage = ({upImage, setUploadedImg, setCrop}) => {

  const [src, setsrc] = useState();

  const [image, setimage] = useState();
  const [croppedImageUrl, setCroppedImageUrl] = useState();
  const [crops, setCrops] = useState();
  const [croppedImageFile, setCroppedImageFile] = useState();

  const fetchdata = () => {
    const image = new Image();
    image.onload = () => {
      setsrc(URL.createObjectURL(upImage));
      setimage(image); // Store the fully loaded image object in state
    };
    image.src = URL.createObjectURL(upImage);
  };

  const complete = (crop, pixelCrop) => {
    makeClientCrop(crop, pixelCrop);
  };

  const makeClientCrop = async (crop) => {
    if (src && crop.width && crop.height) {
      const croppedFile = await getCroppedImg(image, crop);
      setCroppedImageFile(croppedFile); // Update state with the cropped file
      setCroppedImageUrl(URL.createObjectURL(croppedFile));
    }
  };

  const getCroppedImg = (src, crop) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const scaleX = src.naturalWidth / src.width;
      const scaleY = src.naturalHeight / src.height;

      canvas.width = crop.width;
      canvas.height = crop.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        src,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob(
        (blob) => {
          const croppedImageFile = new File([blob], crop.image.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          resolve(croppedImageFile);
        },
        "image/jpeg",
        1
      );
    });
  };

  const cropImage = () => {
    if(croppedImageFile){
        setUploadedImg(croppedImageFile)
        setCroppedImageFile(null);
        setCroppedImageUrl(null);
        setCrops(null);
        setimage(null);
        setsrc(null);
        setCrop();
    }else{
        setUploadedImg(upImage)
        setCrop()
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
  
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10"  onClose={setUploadedImg}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">

                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 uppercase mb-2">
                        Crop Image
                      </Dialog.Title>
                
          
            
            <ReactCrop
              src={src}
              crop={crops}
              onChange={setCrops}
              aspect={9 / 12}
              onComplete={complete}
            >
              <img src={src} alt="Crop Preview" />
            </ReactCrop>


                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center py-2 space-x-4">
                  
                <Button
               variant="gradient"
               type="button"
               onClick={cropImage}
               className="flex items-center gap-3 p-4 mt-5 bg-gray-300 hover:bg-gray-400 text-gray-200 font-bold py-2 px-4 rounded "
             >
               Add Image
            </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CropImage