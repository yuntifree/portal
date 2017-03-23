<style>
.tip {
	position: fixed;
	top: 50%;
	left: 50%;
	transform:translate(-50%, -50%);
	-webkit-transform:translate(-50%, -50%);
	-ms-transform:translate(-50%, -50%);
	-moz-transform:translate(-50%, -50%);
	-o-transform:translate(-50%, -50%);
	padding:.2rem;
	background-color: #000;
	border-radius: .12rem;
	color: #fff;
}

</style>

<template>
<div class="tip g-font14" v-show="show" transition="fade">
	{{tipinfo.msg}}
</div>
</template>

<script>
export default {
	props: {
		tipinfo: {
			msg: String,
			duration: Number,
			show: Boolean
		}
	},
	computed: {
		show() {
			return this.tipinfo.show;
		}
	},
	watch: {
		show(val) {
			if (this._timeout) clearTimeout(this._timeout);
			if (val && !!this.tipinfo.duration) {
			    //this._timeout = setTimeout(()=> this.show = false, this.duration);
			    this._timeout = setTimeout(()=> {
			    	this.$emit('tip-show');
			    }, this.tipinfo.duration);
			}
		}
	}
}
</script>
