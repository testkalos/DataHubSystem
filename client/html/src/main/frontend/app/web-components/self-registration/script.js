'use strict';

Polymer("self-registration", {

	pageTitle: "Register new account",
	signup: ApplicationService.settings.signup,

	newUser:{
		username: null,
		firstname: null,
		lastname: null,
		email: null,
		password: null,
		country: null,
		usage: null,
		subUsage : null,
		domain : null,
		subDomain: null,
		phone: " ",
		address : " "
	},

	observe: {
		'$.firstname.value': 'checkFirstname',
		'$.lastname.value': 'checkLastname',
	    	'$.username.value': 'checkUsername',
	    	'$.password.value': 'checkPasswd',
	    	'$.confirmpassword.value': 'confirmPasswd',
	    	'$.email.value': 'checkEmail',
	    	'$.cofirmemail.value': 'confirmEmail',
	    	'$.subDomain.value': 'checkSubDomain',
	    	'$.subUsage.value': 'checkSubUsage'
    },
    checkFirstname: function (oldValue, newValue) {
    	if(newValue){
        		this.$.firstnamedec.isInvalid = false;
	};
    },

    checkLastname: function (oldValue, newValue) {
    	if(newValue){
        	this.$.lastnamedec.isInvalid = false;
        };	
    },
    checkUsername: function (oldValue, newValue) {
    	if (newValue) {
	    	var regexp = /[^a-zA-Z0-9]/g;
	    	if(regexp.test(newValue)){
        			this.$.usernamedec.error = "Username not valid";
	        		this.$.usernamedec.isInvalid = true;
	        	}
	        	else{
	        		this.$.usernamedec.isInvalid = false;
	        	};
        };	
    },
   
 	checkPasswd: function(oldValue, newValue) {
    	if(newValue){
	    	if(newValue.length < 8){
        		this.$.passworddec.error = "Password too short";
        		this.$.passworddec.isInvalid = true;
        	}else{
        		this.$.passworddec.isInvalid = false;
	    		this.newUser.password = newValue;
	    	};
	    };
  	},
  	confirmPasswd: function(oldValue, newValue){
  		if(newValue){
	  		if (this.newUser.password != newValue) {
	  			this.$.passwordconfdec.error = "Password does't match";
	  			this.$.passwordconfdec.isInvalid = true;
	  		}
	  		else{
	  			this.$.passwordconfdec.isInvalid = false;
	  		};
	  	};
  	},
  	checkEmail: function(oldValue, newValue) {
    	if(newValue){
	    	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    		if(!re.test(newValue)){
	  			this.$.emaildec.error = "E-mail not valid";
				this.$.emaildec.isInvalid = true;
    		}else{
    			this.$.emaildec.isInvalid = false;
	    		this.newUser.email = newValue;
    		};
	    };
  	},
  	confirmEmail: function(oldValue, newValue){
  		if(newValue){
	  		if (this.newUser.email != newValue) {
	  			this.$.emailconfdec.error = "E-mail does't match";
	  			this.$.emailconfdec.isInvalid = true;
	  		}
	  		else{
	  			this.$.emailconfdec.isInvalid = false;
	  		};
	  	};
  	},
  	checkSubDomain: function(oldValue, newValue) {
    	if(newValue){
	    	if(newValue.length < 1){
	        		this.$.subDomaindec.error = "Domain too short";
	        		this.$.subDomaindec.isInvalid = true;
        		
	        	}else{
	        		this.$.subDomaindec.isInvalid = false;
	        		this.newUser.subDomain = newValue;
		};
	}

  	},
  	checkSubUsage: function(oldValue, newValue) {
	    	if(newValue){
		    	if(newValue.length < 1){
		        		this.$.subUsagedec.error = "Usage too short";
		        		this.$.subUsagedec.isInvalid = true;
		        	}else{
	        			this.$.subUsagedec.isInvalid = false;
		    		this.newUser.subUsage = newValue;
		    	};
	    	};
  	},

  	sendRegistration:function(){

		/* firstname */
		if (this.$.firstname.value) {
			this.$.firstnamedec.isInvalid = false;
			this.newUser.firstname = this.$.firstname.value;
		} else{
			this.$.firstnamedec.error = "Firstname empty";
			this.$.firstnamedec.isInvalid = true;
		};

		/* lastname */
		if (this.$.lastname.value) {
			this.$.lastnamedec.isInvalid = false;
			this.newUser.lastname = this.$.lastname.value;
		} else{
			this.$.lastnamedec.error = "Lastname empty";
			this.$.lastnamedec.isInvalid = true;
		};

		/* username */
		if (this.$.username.value) {
			var regexp = /[^a-zA-Z0-9]/g;
		    	if(regexp.test(this.$.username.value)){
	        			this.$.usernamedec.error = "Username not valid";
		        		this.$.usernamedec.isInvalid = true;
		        	}
		        	else{
		        		this.$.usernamedec.isInvalid = false;
				this.newUser.username = this.$.username.value;
		        	};
		} else{
			this.$.usernamedec.error = "Username empty";
			this.$.usernamedec.isInvalid = true;
		};

		/* password */
		if (this.$.password.value) {
			this.$.passworddec.isInvalid = false;
			this.newUser.password = this.$.password.value;
		} else{
			this.$.passworddec.error = "Password empty";
			this.$.passworddec.isInvalid = true;
		};

		/* email */
		if (this.$.email.value) {
			this.$.emaildec.isInvalid = false;
			this.newUser.email = this.$.email.value;
		} else{
			this.$.emaildec.error = "E-mail empty";
			this.$.emaildec.isInvalid = true;
		};

		/* domain */
		if (!this.newUser.domain) {
			this.$.domaindec.error = "Domain empty";
			this.$.domaindec.isInvalid = true;
			this.$.subDomaindec.error = "Domain empty";
			this.$.subDomaindec.isInvalid = true;
		};
		/* usage */
		if (!this.newUser.usage) {
			this.$.usagedec.error = "Domain empty";
			this.$.usagedec.isInvalid = true;
			this.$.subUsagedec.error = "Usage empty";
			this.$.subUsagedec.isInvalid = true;
		};
		/* usage */
		if (!this.newUser.country) {
			this.$.countrydec.error = "Country empty";
			this.$.countrydec.isInvalid = true;
		};


		for (var obj in this.newUser) 
			if(this.newUser[obj] == null)
				return;

		UserService.signup(this.newUser)
			.success(function(){
				AlertManager.success("Registration successful","An email was sent to let you validate your registration.");
			})
			.error(function(){
				AlertManager.error("Registration error","An error occurred while creating account.");
			});      		
	},

	selectUsage: function(e, detail){
		if (detail.isSelected){
			this.$.usagedec.isInvalid = false;
			var selected = detail.item.attributes['value'].value;
    		if (selected == "Other") {
    			this.newUser.usage = selected;
    			$(this.$.subUsagedec).show();
    		}else{
    			$(this.$.subUsagedec).hide();
    			this.newUser.usage = selected;
    			this.newUser.subUsage = "";
    		};
    	}
	},

	selectDomain: function(e, detail){
		if (detail.isSelected){
			this.$.domaindec.isInvalid = false;
			var selected = detail.item.attributes['value'].value;
    		if (selected == "Other") {
    			this.newUser.domain = selected;
    			$(this.$.subDomaindec).show();
    		}else{
    			$(this.$.subDomaindec).hide();
    			this.newUser.domain = selected;
    			this.newUser.subDomain = "";
    		};
    	}
	},

	selectCountry: function(e, detail){
		if (detail.isSelected){
			this.$.countrydec.isInvalid = false;
			var selected = detail.item.attributes['value'].value;
    		if (selected) {
    			this.newUser.country = selected;
    		};
    	}
	},

    ready: function() {

	    var countries = [
			{"name":"Afghanistan","code":"AF"},
			{"name":"Åland Islands","code":"AX"},
			{"name":"Albania","code":"AL"},
			{"name":"Algeria","code":"DZ"},
			{"name":"American Samoa","code":"AS"},
			{"name":"Andorra","code":"AD"},
			{"name":"Angola","code":"AO"},
			{"name":"Anguilla","code":"AI"},
			{"name":"Antarctica","code":"AQ"},
			{"name":"Antigua and Barbuda","code":"AG"},
			{"name":"Argentina","code":"AR"},
			{"name":"Armenia","code":"AM"},
			{"name":"Aruba","code":"AW"},
			{"name":"Australia","code":"AU"},
			{"name":"Austria","code":"AT"},
			{"name":"Azerbaijan","code":"AZ"},
			{"name":"Bahamas","code":"BS"},
			{"name":"Bahrain","code":"BH"},
			{"name":"Bangladesh","code":"BD"},
			{"name":"Barbados","code":"BB"},
			{"name":"Belarus","code":"BY"},
			{"name":"Belgium","code":"BE"},
			{"name":"Belize","code":"BZ"},
			{"name":"Benin","code":"BJ"},
			{"name":"Bermuda","code":"BM"},
			{"name":"Bhutan","code":"BT"},
			{"name":"Bolivia","code":"BO"},
			{"name":"Bosnia and Herzegovina","code":"BA"},
			{"name":"Botswana","code":"BW"},
			{"name":"Bouvet Island","code":"BV"},
			{"name":"Brazil","code":"BR"},
			{"name":"British Indian Ocean Territory","code":"IO"},
			{"name":"Brunei Darussalam","code":"BN"},
			{"name":"Bulgaria","code":"BG"},
			{"name":"Burkina Faso","code":"BF"},
			{"name":"Burundi","code":"BI"},
			{"name":"Cambodia","code":"KH"},
			{"name":"Cameroon","code":"CM"},
			{"name":"Canada","code":"CA"},
			{"name":"Cape Verde","code":"CV"},
			{"name":"Cayman Islands","code":"KY"},
			{"name":"Central African Republic","code":"CF"},
			{"name":"Chad","code":"TD"},
			{"name":"Chile","code":"CL"},
			{"name":"China","code":"CN"},
			{"name":"Christmas Island","code":"CX"},
			{"name":"Cocos (Keeling) Islands","code":"CC"},
			{"name":"Colombia","code":"CO"},
			{"name":"Comoros","code":"KM"},
			{"name":"Congo","code":"CG"},
			{"name":"Congo, Democratic Republic","code":"CD"},
			{"name":"Cook Islands","code":"CK"},
			{"name":"Costa Rica","code":"CR"},
			{"name":"Cote D\"Ivoire","code":"CI"},
			{"name":"Croatia","code":"HR"},
			{"name":"Cuba","code":"CU"},
			{"name":"Cyprus","code":"CY"},
			{"name":"Czech Republic","code":"CZ"},
			{"name":"Denmark","code":"DK"},
			{"name":"Djibouti","code":"DJ"},
			{"name":"Dominica","code":"DM"},
			{"name":"Dominican Republic","code":"DO"},
			{"name":"Ecuador","code":"EC"},
			{"name":"Egypt","code":"EG"},
			{"name":"El Salvador","code":"SV"},
			{"name":"Equatorial Guinea","code":"GQ"},
			{"name":"Eritrea","code":"ER"},
			{"name":"Estonia","code":"EE"},
			{"name":"Ethiopia","code":"ET"},
			{"name":"Falkland Islands (Malvinas)","code":"FK"},
			{"name":"Faroe Islands","code":"FO"},
			{"name":"Fiji","code":"FJ"},
			{"name":"Finland","code":"FI"},
			{"name":"France","code":"FR"},
			{"name":"French Guiana","code":"GF"},
			{"name":"French Polynesia","code":"PF"},
			{"name":"French Southern Territories","code":"TF"},
			{"name":"Gabon","code":"GA"},
			{"name":"Gambia","code":"GM"},
			{"name":"Georgia","code":"GE"},
			{"name":"Germany","code":"DE"},
			{"name":"Ghana","code":"GH"},
			{"name":"Gibraltar","code":"GI"},
			{"name":"Greece","code":"GR"},
			{"name":"Greenland","code":"GL"},
			{"name":"Grenada","code":"GD"},
			{"name":"Guadeloupe","code":"GP"},
			{"name":"Guam","code":"GU"},
			{"name":"Guatemala","code":"GT"},
			{"name":"Guernsey","code":"GG"},
			{"name":"Guinea","code":"GN"},
			{"name":"Guinea-Bissau","code":"GW"},
			{"name":"Guyana","code":"GY"},
			{"name":"Haiti","code":"HT"},
			{"name":"Heard Island and Mcdonald Islands","code":"HM"},
			{"name":"Holy See (Vatican City State)","code":"VA"},
			{"name":"Honduras","code":"HN"},
			{"name":"Hong Kong","code":"HK"},
			{"name":"Hungary","code":"HU"},
			{"name":"Iceland","code":"IS"},
			{"name":"India","code":"IN"},
			{"name":"Indonesia","code":"ID"},
			{"name":"Iran","code":"IR"},
			{"name":"Iraq","code":"IQ"},
			{"name":"Ireland","code":"IE"},
			{"name":"Isle of Man","code":"IM"},
			{"name":"Israel","code":"IL"},
			{"name":"Italy","code":"IT"},
			{"name":"Jamaica","code":"JM"},
			{"name":"Japan","code":"JP"},
			{"name":"Jersey","code":"JE"},
			{"name":"Jordan","code":"JO"},
			{"name":"Kazakhstan","code":"KZ"},
			{"name":"Kenya","code":"KE"},
			{"name":"Kiribati","code":"KI"},
			{"name":"Korea (North)","code":"KP"},
			{"name":"Korea (South)","code":"KR"},
			{"name":"Kosovo","code":"XK"},
			{"name":"Kuwait","code":"KW"},
			{"name":"Kyrgyzstan","code":"KG"},
			{"name":"Laos","code":"LA"},
			{"name":"Latvia","code":"LV"},
			{"name":"Lebanon","code":"LB"},
			{"name":"Lesotho","code":"LS"},
			{"name":"Liberia","code":"LR"},
			{"name":"Libyan Arab Jamahiriya","code":"LY"},
			{"name":"Liechtenstein","code":"LI"},
			{"name":"Lithuania","code":"LT"},
			{"name":"Luxembourg","code":"LU"},
			{"name":"Macao","code":"MO"},
			{"name":"Macedonia","code":"MK"},
			{"name":"Madagascar","code":"MG"},
			{"name":"Malawi","code":"MW"},
			{"name":"Malaysia","code":"MY"},
			{"name":"Maldives","code":"MV"},
			{"name":"Mali","code":"ML"},
			{"name":"Malta","code":"MT"},
			{"name":"Marshall Islands","code":"MH"},
			{"name":"Martinique","code":"MQ"},
			{"name":"Mauritania","code":"MR"},
			{"name":"Mauritius","code":"MU"},
			{"name":"Mayotte","code":"YT"},
			{"name":"Mexico","code":"MX"},
			{"name":"Micronesia","code":"FM"},
			{"name":"Moldova","code":"MD"},
			{"name":"Monaco","code":"MC"},
			{"name":"Mongolia","code":"MN"},
			{"name":"Montserrat","code":"MS"},
			{"name":"Morocco","code":"MA"},
			{"name":"Mozambique","code":"MZ"},
			{"name":"Myanmar","code":"MM"},
			{"name":"Namibia","code":"NA"},
			{"name":"Nauru","code":"NR"},
			{"name":"Nepal","code":"NP"},
			{"name":"Netherlands","code":"NL"},
			{"name":"Netherlands Antilles","code":"AN"},
			{"name":"New Caledonia","code":"NC"},
			{"name":"New Zealand","code":"NZ"},
			{"name":"Nicaragua","code":"NI"},
			{"name":"Niger","code":"NE"},
			{"name":"Nigeria","code":"NG"},
			{"name":"Niue","code":"NU"},
			{"name":"Norfolk Island","code":"NF"},
			{"name":"Northern Mariana Islands","code":"MP"},
			{"name":"Norway","code":"NO"},
			{"name":"Oman","code":"OM"},
			{"name":"Pakistan","code":"PK"},
			{"name":"Palau","code":"PW"},
			{"name":"Palestinian Territory, Occupied","code":"PS"},
			{"name":"Panama","code":"PA"},
			{"name":"Papua New Guinea","code":"PG"},
			{"name":"Paraguay","code":"PY"},
			{"name":"Peru","code":"PE"},
			{"name":"Philippines","code":"PH"},
			{"name":"Pitcairn","code":"PN"},
			{"name":"Poland","code":"PL"},
			{"name":"Portugal","code":"PT"},
			{"name":"Puerto Rico","code":"PR"},
			{"name":"Qatar","code":"QA"},
			{"name":"Reunion","code":"RE"},
			{"name":"Romania","code":"RO"},
			{"name":"Russian Federation","code":"RU"},
			{"name":"Rwanda","code":"RW"},
			{"name":"Saint Helena","code":"SH"},
			{"name":"Saint Kitts and Nevis","code":"KN"},
			{"name":"Saint Lucia","code":"LC"},
			{"name":"Saint Pierre and Miquelon","code":"PM"},
			{"name":"Saint Vincent and the Grenadines","code":"VC"},
			{"name":"Samoa","code":"WS"},
			{"name":"San Marino","code":"SM"},
			{"name":"Sao Tome and Principe","code":"ST"},
			{"name":"Saudi Arabia","code":"SA"},
			{"name":"Senegal","code":"SN"},
			{"name":"Serbia","code":"RS"},
			{"name":"Montenegro","code":"ME"},
			{"name":"Seychelles","code":"SC"},
			{"name":"Sierra Leone","code":"SL"},
			{"name":"Singapore","code":"SG"},
			{"name":"Slovakia","code":"SK"},
			{"name":"Slovenia","code":"SI"},
			{"name":"Solomon Islands","code":"SB"},
			{"name":"Somalia","code":"SO"},
			{"name":"South Africa","code":"ZA"},
			{"name":"South Georgia and the South Sandwich Islands","code":"GS"},
			{"name":"Spain","code":"ES"},
			{"name":"Sri Lanka","code":"LK"},
			{"name":"Sudan","code":"SD"},
			{"name":"Suriname","code":"SR"},
			{"name":"Svalbard and Jan Mayen","code":"SJ"},
			{"name":"Swaziland","code":"SZ"},
			{"name":"Sweden","code":"SE"},
			{"name":"Switzerland","code":"CH"},
			{"name":"Syrian Arab Republic","code":"SY"},
			{"name":"Taiwan, Province of China","code":"TW"},
			{"name":"Tajikistan","code":"TJ"},
			{"name":"Tanzania","code":"TZ"},
			{"name":"Thailand","code":"TH"},
			{"name":"Timor-Leste","code":"TL"},
			{"name":"Togo","code":"TG"},
			{"name":"Tokelau","code":"TK"},
			{"name":"Tonga","code":"TO"},
			{"name":"Trinidad and Tobago","code":"TT"},
			{"name":"Tunisia","code":"TN"},
			{"name":"Turkey","code":"TR"},
			{"name":"Turkmenistan","code":"TM"},
			{"name":"Turks and Caicos Islands","code":"TC"},
			{"name":"Tuvalu","code":"TV"},
			{"name":"Uganda","code":"UG"},
			{"name":"Ukraine","code":"UA"},
			{"name":"United Arab Emirates","code":"AE"},
			{"name":"United Kingdom","code":"GB"},
			{"name":"United States","code":"US"},
			{"name":"United States Minor Outlying Islands","code":"UM"},
			{"name":"Uruguay","code":"UY"},
			{"name":"Uzbekistan","code":"UZ"},
			{"name":"Vanuatu","code":"VU"},
			{"name":"Venezuela","code":"VE"},
			{"name":"Viet Nam","code":"VN"},
			{"name":"Virgin Islands, British","code":"VG"},
			{"name":"Virgin Islands, U.S.","code":"VI"},
			{"name":"Wallis and Futuna","code":"WF"},
			{"name":"Western Sahara","code":"EH"},
			{"name":"Yemen","code":"YE"},
			{"name":"Zambia","code":"ZM"},
			{"name":"Zimbabwe","code":"ZW"}
		];

	    var domains = [
		   	'Atmosphere',
			'Emergency',
			'Marine',
			'Land',
			'Security',
			'Climate',
			'Other'
	    ];
	    var usages =[
	    	'Research',
			'Commercial',
			'Education',
			'Other'
	    ];
	    this.countries = countries;
	    this.domains = domains;
	    this.usages = usages;
    },   
});