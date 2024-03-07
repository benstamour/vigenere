Vigenère Cipher
===============

This repository is my first project using Vue.js; it contains a program to encrypt and decrypt messages using the Vigenère cipher. You can access the website version of this [here](https://bensta.epizy.com/vigenere).

A Brief Explanation of Vigenère
-------------------------------

A common type of cipher is the Caesar cipher, where each letter in a message is shifted a certain number of letters. For example, using a Caesar cipher where we shift each letter right by 3, A would become D, B would become E, and so on. Using this shift, HELLO WORLD would become KHOOR ZRUOG.

With the Vigenère cipher, each letter of the code is encoded using a different Caesar cipher, where each shift is determined using a key. For example, to encode the message HELLO WORLD using the key BEN, we would do the following:

- H would be shifted by 1 position, since if we count from 0, B is the 1st letter of the alphabet (A would be the 0th letter), and so we get I.
- E would be shifted by 4 positions, since E is the 4th letter of the alphabet, yielding I.
- L would be shifted by 13 positions, since N is the 13th letter of the alphabet, yielding Y.
- Since we have gone through each letter of our key, we repeat it with B, so we shift L by 1 position, yielding M.
- Continuing this process, we end up with IIYMS JPVYE as our encoded message.

Since the shift of each letter varies with Vigenère, it can be a much more difficult cipher to break than the Caesar cipher (which is a special case of the Vigenère cipher where the key has a length of 1 letter). Note that in our Vigenère example, H and E both mapped to I, while the first two L's mapped differently, the first to Y and the second to M, so repeated letters in the encoded message cannot always be used to break the code.
