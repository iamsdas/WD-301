import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import { ShareIcon } from '@heroicons/react/outline';

export default function ShareForm() {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className='flex gap-1 px-2'>
      <CopyToClipboard text={window.location.toString()} onCopy={onCopy}>
        <button className='flex gap-1'>
          <span className='sr-only'>Share Form</span>
          <ShareIcon className='h-6 w-6 text-blue-500' aria-hidden='true' />
        </button>
      </CopyToClipboard>
      {copied && <span className='text-gray-500'> Link Copied!</span>}
    </div>
  );
}
