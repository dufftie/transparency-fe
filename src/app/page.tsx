import D3Graph from '@/src/components/d3-graph/d3-graph'

export default async function Home() {

  return (
    <div className="home-page">
      <div className="graph-container">
        <D3Graph />
      </div>
    </div>
  )
}

