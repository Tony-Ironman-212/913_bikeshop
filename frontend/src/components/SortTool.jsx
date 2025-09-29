function SortTool({ selectedSort, setSelectedSort }) {
  return (
    <div>
      <select
        className='rounded border border-gray-300 px-3 py-2'
        value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value)}
      >
        <option value=''>--並び替え--</option>
        <option value='newest'>新着順</option>
        <option value='price_low'>価格が安い順</option>
        <option value='price_high'>価格が高い順</option>
        <option value='a-z'>アルファベットA-Z順</option>
        <option value='z-a'>アルファベットZ-A順</option>
      </select>
    </div>
  );
}

export default SortTool;
