import React from 'react'

function HeroSection() {
  return (
    <>
    {/* <!-- Start Hero Section --> */}
			<div class="hero">
				<div class="container">
					<div class="row justify-content-between">
						<div class="col-lg-5">
							<div class="intro-excerpt">
								<h1>Digital Marketing <span clsas="d-block">Platform</span></h1>
								<p class="mb-4">Welcome to our Digital Marketing Platform. We Provide a variety of Digital Marketing Services and a space for young Entrepreneurs to Glow up!</p>
								
							</div>
						</div>
						<div class="col-lg-7">
							<div class="hero-img-wrap">
								<img src="img/digital_marketing.png" class="img-fluid"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/* <!-- End Hero Section --> */}
    </>
  )
}

export default HeroSection
