function ContactInput(props) {
  return (
    <fieldset className='my-5 flex flex-col'>
      <label htmlFor={props.id}>
        {props.label}
        <span className='text-red-500'>*</span>
      </label>
      <input
        className='border border-gray-300 p-2 text-gray-800'
        type={props.type}
        id={props.id}
        name={props.id}
        placeholder={props.placeholder ? `例: ${props.placeholder}` : ''}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {props.error && (
        <span className='text-[12px] text-red-500'>{props.error}</span>
      )}
    </fieldset>
  );
}

export default ContactInput;
