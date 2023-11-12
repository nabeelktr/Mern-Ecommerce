import { Stepper, Step, Typography } from "@material-tailwind/react";
import {
  ClockIcon,
  ServerIcon,
  ShoppingCartIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

const OrderStepper = ({ activeStep }) => {
  return (
    <Stepper activeStep={activeStep} >
      <Step className="h-7 w-7">
        <ClockIcon className="h-4 w-4" />
        <div className="absolute -bottom-[2rem] w-max text-center">
          <Typography
          className="text-sm font-bold"
            color={activeStep === 0 ? "blue-gray" : "gray"}
          >
            Pending
          </Typography>
        </div>
      </Step>
      <Step className="h-7 w-7">
        <ServerIcon className="h-4 w-4" />
        <div className="absolute -bottom-[2rem] w-max text-center">
          <Typography
            className="text-sm font-bold"
            color={activeStep === 1 ? "blue-gray" : "gray"}
          >
            Proccessing
          </Typography>
        </div>
      </Step>
      <Step className="h-7 w-7">
        <ShoppingCartIcon className="h-4 w-4" />
        <div className="absolute -bottom-[2rem] w-max text-center">
          <Typography
            className="text-sm font-bold"
            color={activeStep === 2 ? "blue-gray" : "gray"}
          >
            Shipped
          </Typography>
        </div>
      </Step>
      <Step className="h-7 w-7">
        <CheckBadgeIcon className="h-5 w-5" />
        <div className="absolute -bottom-[2rem] w-max text-center">
          <Typography
            className="text-sm font-bold"
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
