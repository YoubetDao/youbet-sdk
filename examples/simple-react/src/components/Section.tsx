export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (<>
    <div className='section'>
      <div className='section-header'>
        <h2 className='section-title' id={title}><a href={`#${title}`}>{title}</a></h2> 
      </div>
      {/* <button onClick={getGoalDetails}>Get Goal Details</button> */}
      <div className='section-content'>
        {children}
      </div>
    </div>
  </>)
}