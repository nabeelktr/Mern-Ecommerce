import { Stepper, Step, Typography } from "@material-tailwind/react";
import {
  ClockIcon,
  ServerIcon,
  CheckBadgeIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const OrderStepper = ({ activeStep }) => {
  return (
    <Stepper activeStep={activeStep} >
      <Step className="h-5 md:h-7 w-5 md:w-7 ">
        <ClockIcon className="h-3 md:h-4 md:w-4 w-3" />
        <div className="absolute md:-bottom-[2rem] -bottom-[1.2rem] w-max text-center">
          <Typography
          className="md:text-sm text-[0.6rem] font-semibold"
            color={activeStep === 0 ? "blue-gray" : "gray"}
          >
            Pending
          </Typography>
        </div>
      </Step>
      <Step className="h-5 md:h-7 w-5 md:w-7 ">
        <ServerIcon className="h-3 md:h-4 md:w-4 w-3" />
        <div className="absolute md:-bottom-[2rem] -bottom-[1.2rem] w-max text-center">
          <Typography
            className="md:text-sm text-[0.6rem] font-semibold"
            color={activeStep === 1 ? "blue-gray" : "gray"}
          >
            Proccessing
          </Typography>
        </div>
      </Step>
      <Step className="h-5 md:h-7 w-5 md:w-7 ">
        <TruckIcon className="h-3 md:h-4 md:w-4 w-3" />
        <div className="absolute md:-bottom-[2rem] -bottom-[1.2rem] w-max text-center">
          <Typography
            className="md:text-sm text-[0.6rem] font-semibold"
            color={activeStep === 2 ? "blue-gray" : "gray"}
          >
            Shipped
          </Typography>
        </div>
      </Step>
      <Step className="h-5 md:h-7 w-5 md:w-7 ">
        <CheckBadgeIcon className="h-4 md:h-5 md:w-5 w-4" />
        <div className="absolute md:-bottom-[2rem] -bottom-[1.2rem] w-max text-center">
          <Typography
            className="md:text-sm text-[0.6rem] font-semibold"
            color={activeStep === 3 ? "blue-gray" : "gray"}
          >
            Delivered
          </Typography>
        </div>
      </Step>
    </Stepper>
  );
};

export default OrderStepper;
