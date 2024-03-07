import { ref } from 'vue'
export default {
	setup() {
		var letters = ref([]);
		for(let i = 65; i <= 90; i++)
		{
			letters.value.push(String.fromCharCode(i));
		}
		console.log(letters.value);
		
		var mode = ref(0);
		
		var msg = ref('HELLO WORLD!');
		var key = ref('BEN');
		var encodedmsg = ref('');
		
		var msg2 = ref('XQVLRVTM');
		var key2 = ref('CIPHER');
		var decodedmsg = ref('');
		
		function encode()
		{
			//msg.value = msg.value.toUpperCase();
			//key.value = key.value.toUpperCase();
			let filteredkey = filter(key);
			let encoded = '';
			let charnum = 0;
			for(let i = 0; i < msg.value.length; i++)
			{
				let filteredkey = filter(key.value);
				let character = msg.value[i].toUpperCase();
				if(letters.value.includes(character))
				{
					let keychar = filteredkey[charnum%filteredkey.length].toUpperCase();
					let charindex = letters.value.indexOf(character);
					let keyindex = letters.value.indexOf(keychar);
					let encodedchar = letters.value[(charindex + keyindex)%letters.value.length];
					encoded += encodedchar;
					charnum++;
				}
				else
				{
					encoded += character;
				}
			}
			//console.log(encoded);
			encodedmsg.value = encoded;
		}
		encode();
		
		function decode()
		{
			let decoded = '';
			let charnum = 0;
			for(let i = 0; i < msg2.value.length; i++)
			{
				let filteredkey = filter(key2.value);
				let character = msg2.value[i].toUpperCase();
				if(letters.value.includes(character))
				{
					let keychar = filteredkey[charnum%filteredkey.length].toUpperCase();
					let charindex = letters.value.indexOf(character);
					let keyindex = letters.value.indexOf(keychar);
					let decodedchar = letters.value[(charindex - keyindex + letters.value.length)%letters.value.length];
					decoded += decodedchar;
					charnum++;
				}
				else
				{
					decoded += character;
				}
			}
			decodedmsg.value = decoded;
		}
		decode();
		
		function filter(str)
		{
			var filteredstr = '';
			for(let i = 0; i < str.length; i++)
			{
				if(str[i].match(/[a-z]/i))
				{
					filteredstr += str[i].toUpperCase();
				}
			}
			if(filteredstr == '')
			{
				filteredstr = 'A';
			}
			return filteredstr;
		}
		
		return { msg, key, encodedmsg, encode, mode, decode, decodedmsg, msg2, key2 };
	},
	template: `<div>
		<div style="text-align: center"><div class="btn-group" role="group" aria-label="toggle mode">
			<input type="radio" class="btn-check" name="btnradio" id="aboutbtn" autocomplete="off" @click="mode = 2" />
			<label class="btn btn-outline-primary" for="aboutbtn">About</label>
			
			<input type="radio" class="btn-check" name="btnradio" id="encryptbtn" autocomplete="off" @click="mode = 0" checked />
			<label class="btn btn-outline-primary" for="encryptbtn">Encrypt</label>

			<input type="radio" class="btn-check" name="btnradio" id="decryptbtn" autocomplete="off" @click="mode = 1" />
			<label class="btn btn-outline-primary" for="decryptbtn">Decrypt</label>
		</div></div>
		<br />
		
		<div v-if="mode == 0">
			<div style="text-align: center">
				Encrypted Message:<br /><span id="encoded">{{ encodedmsg }}</span>
			</div>
			<!--<table class="outputtable">
				<tr><th style="text-align: right">Encoded Message:</th><td id="encoded">{{ encodedmsg }}</td></tr>
			</table>-->
			<br />
			<table class="inputtable">
				<tr><th style="text-align: right">Key:</th><td><input id="keyinput" v-model="key" @keyup="encode()" /></td></tr>
				<tr><th style="text-align: right">Message:</th><td><input id="msginput" @keyup="encode()" v-model="msg" /></td></tr>
			</table>
		</div>
		
		<div v-else-if="mode == 1">
			<div style="text-align: center">
				Decrypted Message:<br /><span id="decoded">{{ decodedmsg }}</span>
			</div>
			<!--<table class="outputtable">
				<tr><th style="text-align: right">Decoded Message:</th><td id="decoded">{{ decodedmsg }}</td></tr>
			</table>-->
			<br />
			<table class="inputtable">
				<tr><th style="text-align: right">Key:</th><td><input id="key2input" v-model="key2" @keyup="decode()" /></td></tr>
				<tr><th style="text-align: right">Message:</th><td><input id="msg2input" @keyup="decode()" v-model="msg2" /></td></tr>
			</table>
		</div>
		
		<div v-else>
			<h3 style="text-align: center">
				How Vigenère Works
			</h3>
			<br />
			A common type of cipher is the Caesar cipher, where each letter in a message is shifted a certain number of letters. For example, using a Caesar cipher where we shift each letter right by 3, A would become D, B would become E, and so on. Using this shift, HELLO WORLD would become KHOOR ZRUOG.
			<br /><br />
			With the Vigenère cipher, each letter of the code is encoded using a different Caesar cipher, where each shift is determined using a key. For example, to encode the message HELLO WORLD using the key BEN, we would do the following:<br /><br />
			<ul style="margin-bottom:0">
				<li>H would be shifted by 1 position, since if we count from 0, B is the 1st letter of the alphabet (A would be the 0th letter), and so we get I.</li>
				<li>E would be shifted by 4 positions, since E is the 4th letter of the alphabet, yielding I.</li>
				<li>L would be shifted by 13 positions, since N is the 13th letter of the alphabet, yielding Y.</li>
				<li>Since we have gone through each letter of our key, we repeat it with B, so we shift L by 1 position, yielding M.</li>
				<li>Continuing this process, we end up with IIYMS JPVYE as our encoded message.</li>
			</ul><br />
			Since the shift of each letter varies with Vigenère, it can be a much more difficult cipher to break than the Caesar cipher (which is a special case of the Vigenère cipher where the key has a length of 1 letter). Note that in our Vigenère example, H and E both mapped to I, while the first two L's mapped differently, the first to Y and the second to M, so repeated letters in the encoded message cannot always be used to break the code.
		</div>
		<br />
	</div>`
}
// @input="msg = msg.toUpperCase(); encode()"

/* <button class="letterbtn" v-for="letter in letters.filter(letter => letter.charCodeAt(0) <= 77)" :key="letter">{{ letter }}</button>
		<br />
		<button class="letterbtn" v-for="letter in letters.filter(letter => letter.charCodeAt(0) > 77)" :key="letter">{{ letter }}</button>
		*/