function FilterToolItem(props) {
  const { title, field, filter, setFilter } = props;
  return (
    <div
      className='flex cursor-pointer items-center gap-3'
      onClick={() => {
        setFilter((prev) => ({ ...prev, [field]: !prev[field] }));
      }}
    >
      <span className='flex size-5 items-center justify-center border'>
        {filter[field] && (
          <span className='absolute block size-[14px] bg-gray-800'></span>
        )}
      </span>
      <p>{title}</p>
    </div>
  );
}

export default FilterToolItem;
