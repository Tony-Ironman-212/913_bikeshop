import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

function FaqItem(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='inline-flex cursor-pointer items-center gap-3'
      >
        <span className='relative block size-7 rounded-[50%] border'>
          <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            {isOpen ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </span>
        </span>
        <p>{props.question}</p>
      </div>
      {isOpen && <p className='-mt-4 pl-10 font-medium'>{props.answer}</p>}
    </>
  );
}

export default FaqItem;
