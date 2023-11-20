import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import Axios from '../../../../axiosInterceptors/userAxios' 
import Transactions from './Transactions';

const Wallet = () => {

  const [Wallet, setWallet] = useState();

  const fetchdata = async () => {
    const {data} = await Axios.get('/wallet');
    setWallet(data);
  }

  useEffect(() => {
    fetchdata();
  },[])
  return (
    <div className="p-4 m-4 border  justify-center shadow-sm font-poppins tracking-widest">
      <div className="border-b p-4  px-8 font-semibold">
        <p>My Wallet</p>
      </div>
      <div className="p-4   px-10 flex flex-col justify-start gap-10 ">

          <div className="p-4  w-full flex flex-col justify-center ">
            <div className="flex justify-center items-center gap-3">
                <img src="/src/assets/mantra-credit-logo.svg" width={80} />
                <span className="font-semibold text-[1.5rem] mt-5">&#8377; {Wallet? Wallet.balance : 0}</span>
            </div>
            <div className="border mt-16 items-center justify-between flex shadow-sm cursor-pointer">
              <span className="py-3 px-5 text-sm">Transaction Log</span>
              {/* <ChevronRightIcon className='h-5 w-5 mr-3' /> */}
            </div>
            {Wallet && <Transactions transactions={Wallet?.transactions} />}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
