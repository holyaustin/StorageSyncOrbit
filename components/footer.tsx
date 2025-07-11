import Image from 'next/image';

export default function Footer() {
  return (
    <div className="fixed bottom-0 w-full bg-purple-950 flex items-center flex-col lg:flex-row lg:justify-between gap-4 px-4">
      <div className="flex flex-row gap-8 items-center justify-center mb-4 pt-4">
        <a
          className="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none hover:text-white justify-center rounded-full shadow-[5px_5px_black] text-center transform transition w-full px-2 py-2"
          href="https://x.com/holyaustin"
        >
          <Image src="/assets/logos/x-logo.png" width={30} height={30} alt="X Logo" />
        </a>

        <a
          className="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none hover:text-white justify-center rounded-full shadow-[5px_5px_black] text-center transform transition w-full px-2 py-2"
          href="https://discord.com/invite/StorageSyncOrbit  "
        >
          <Image src="/assets/logos/discord-logo.png" width={30} height={30} alt="Discord Logo" />
        </a>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center mb-2">
        <p className="inline-block text-white">Made with</p>
        <Image src="/assets/icons/heart.png" width={30} height={30} alt="Heart Icon" />
        <p className="inline-block text-white">by Team StorageSyncOrbit (c) 2025</p>
      </div>
    </div>
  );
}
