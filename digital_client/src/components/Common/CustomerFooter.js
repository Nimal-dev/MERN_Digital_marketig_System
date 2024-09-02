import React from 'react'
import { Link } from "react-router-dom";

function CustomerFooter() {
  return (
    <>
     <footer class="footer-sections">
			<div class="container relative">

{/* 
      <div class="sofa-img">
					<img src="img/digital_marketing.png" alt="Image" class="img-fluid" style={{width:"500px", height:"350px"}}/>
				</div> */}

				<div class="row g-5 ">
					<div class="col">
						<div class="mb-4 footer-logo-wrap"><a href="#" class="footer-logo">Digital Marketing Platform</a></div>
						<p class="mb-4">logipromptproacademy</p>

						
					</div>

					{/* <div class="col-lg-6">
						<div class="row links-wrap">
							<div class="col-6 col-sm-6 col-md-9">
								<ul class="list-unstyled">
									<li><a href="#">About us</a></li>
									<li><a href="#">Services</a></li>
									<li><a href="#">Blog</a></li>
									<li><a href="#">Contact us</a></li>
								</ul>
							</div>

							
						</div>
					</div> */}

				</div>

				<div class="border-top copyright">
					<div class="row pt-4">
						<div class="col-lg-6">
							<p class="mb-2 text-center text-lg-start" style={{color:"black"}}>Copyright &copy;<script>document.write(new Date().getFullYear());</script>. All Rights Reserved. &mdash; Designed and Distributed with love by <a href="https://logipromptproacademy.com" style={{color:"darkgreen"}}> Logiprompt Pro Academy</a>  
            </p>
						</div>

						{/* <div class="col-lg-6 text-center text-lg-end">
							<ul class="list-unstyled d-inline-flex ms-auto">
								<li class="me-4"><a href="#">Terms &amp; Conditions</a></li>
								<li><a href="#">Privacy Policy</a></li>
							</ul>
						</div> */}

					</div>
				</div>

			</div>
		</footer>
    </>
  )
}

export default CustomerFooter