<script type="text/javascript">
    
</script>

<style>
	.classIcon{
		position: absolute;
	    right: 150px;
	    top: 35px;
	    font-size: 150px;
	    opacity: 0.25;
		transform: rotate(-7deg);
	}

	.classIconSR{
		position: absolute;
	    right: 150px;
	    top: 35px;
	    font-size: 150px;
	    opacity: 0.25;
	}

	.classIconMoney{
		margin: 10px;
		font-size: 80px;
    	color: #FFC107;
	}

	.classIconCheck{
		margin: 10px;
		font-size: 80px;
		color: #4CAF50;
	}

	.classIconX{
		margin: 10px;
		font-size: 80px;
		color: red;
	}
	
	@media (max-width: 800px){
		.classIconMovil{
			right: inherit !important;
			top: inherit !important;
			width: 100% !important;
			text-align: center !important;
			margin-left: -15px !important;
		}
	}

</style>

<div style="height: 80%">

	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<div class="padding0Movil" style="padding: 10px 50px 10px 50px">
					<br>

					<div style="display: flex">
						<p id="pTitulo" class="textCenter fontSizeAunMasBig colorPink width100porciento sombraTexto fontSize35pxMovil" style="font-family: 'Lobster', cursive;"><?php echo $msgTitulo ?></p>
						
					</div>

					<hr class="styleHR">

					<p class="textCenter fontSize16px fontSize20pxMovil fontFamilyRoboto"><?php echo $msgSubTitulo ?></p>

					<div class="centradoVerticalHorizontal">
						<i class="fas fa-donate classIconMoney"></i>
						<?php echo $icon ?>
					</div>

				</div>
			</div>
		</div>
	</div>

</div>