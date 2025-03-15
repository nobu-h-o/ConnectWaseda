"use client"

import { useState } from "react"
import Image from "next/image"

export default function EventTabs() {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <>
      <div className="tabs">
        <div className={`tab1 ${activeTab === 0 ? "active-tab" : ""}`} onClick={() => handleTabClick(0)}>
          <Image src="/images/gradcap.png" alt="Graduation Cap" width={64} height={64} />
          <p>Events Hosted By Waseda</p>
        </div>

        <div className={`tab2 ${activeTab === 1 ? "active-tab" : ""}`} onClick={() => handleTabClick(1)}>
          <Image src="/images/students.png" alt="Students" width={48} height={48} />
          <p>Created & Hosted By Students</p>
        </div>

        <div className={`tab3 ${activeTab === 2 ? "active-tab" : ""}`} onClick={() => handleTabClick(2)}>
          <Image src="/images/searchicon.png" alt="Search Icon" width={48} height={48} />
          <p>Search By Organization/Category</p>
        </div>
      </div>

      <div className="tab-content" style={{ display: activeTab === 0 ? "block" : "none" }}>
        <h2>Events Hosted By Waseda</h2>
        <p>Here you can find events organized by Waseda University.</p>
        <div className="eventCards">
          <div>EVENT DETAILS</div>
          <div>EVENT DETAILS</div>
          <div>EVENT DETAILS</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
        </div>
      </div>

      <div className="tab-content" style={{ display: activeTab === 1 ? "block" : "none" }}>
        <h2>Created & Hosted By Students</h2>
        <p>Discover events created by students for students.</p>
      </div>

      <div className="tab-content" style={{ display: activeTab === 2 ? "block" : "none" }}>
        <h2>Search By Organization/Category</h2>
        <p>Find events based on clubs, societies, or categories.</p>
      </div>
    </>
  )
}

