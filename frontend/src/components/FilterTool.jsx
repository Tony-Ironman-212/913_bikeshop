import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// import cá nhân
import FilterToolItem from './FilterToolItem';

function FilterTool(props) {
  const [isOpen, setIsOpen] = useState({
    status: false,
    type: false,
    size: false,
    price: false,
  });

  const {
    field,
    title,
    filter,
    setFilter,
    filterItems,
    priceRange,
    setPriceRange,
  } = props;

  return (
    <div>
      <div
        className='flex cursor-pointer items-center justify-between px-5 py-3'
        onClick={() => setIsOpen({ ...isOpen, [field]: !isOpen[field] })}
      >
        <p>{title}</p>
        <span>
          {isOpen[field] ? (
            <FontAwesomeIcon icon={faAngleUp} />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} />
          )}
        </span>
      </div>
      {isOpen[field] && (
        <div className='px-5 pb-2'>
          {field === 'price' && (
            <>
              <p>
                価格範囲：
                <br />
                {priceRange[0].toLocaleString()} ¥~{' '}
                {priceRange[1].toLocaleString()} ¥
              </p>
              <Slider
                range
                min={0}
                max={2000000}
                step={50000}
                value={priceRange}
                onChange={(value) => {
                  setPriceRange(value);
                  setFilter((prev) => ({
                    ...prev,
                    minPrice: value[0],
                    maxPrice: value[1],
                  }));
                }}
                allowCross={false}
              />
            </>
          )}

          {filterItems?.map((item, index) => {
            return (
              <FilterToolItem
                key={index}
                title={item.title}
                field={item.field}
                filter={filter}
                setFilter={setFilter}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FilterTool;
