import { Email, Updated } from './shared';

export default function LicenseContent() {
  return (
    <>
      <h1>
        Use License
        <Updated />
      </h1>

      <p>
        The source code for the Code Bin website is open source under the MIT
        License. This page explains what that covers and what it doesn’t.
      </p>

      <hr />

      <h2>What the licence covers</h2>

      <p>
        The MIT License applies to the website’s source code, published at{' '}
        <a href="https://github.com/CodeBinGit">github.com/CodeBinGit</a>. You
        can use, copy, change and share it, including for commercial projects,
        as long as you include the copyright notice and licence text below.
      </p>

      <h2>What it doesn’t cover</h2>

      <ul>
        <li>
          <strong>Pastes.</strong> Content posted on Code Bin belongs to the
          people who posted it, not to us, and isn’t covered by this licence. To
          reuse someone’s paste, you need their permission or a licence they’ve
          included with it. See section 3 of our{' '}
          <a href="/legal/terms#content">Terms of Service</a>.
        </li>
        <li>
          <strong>Our name and logo.</strong> The MIT License doesn’t give you
          rights to the Code Bin name, logo or branding. If you run your own
          copy of the code, please give it a different name and logo so people
          don’t mistake it for us.
        </li>
        <li>
          <strong>Third-party code.</strong> The project depends on open source
          packages that have their own licences, which you must follow too.
        </li>
      </ul>

      <hr />

      <h2>Licence text</h2>

      <pre className="whitespace-pre-wrap">{`MIT License

Copyright (c) 2022-2026 Code Bin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}</pre>

      <hr />

      <h2>Questions</h2>

      <p>
        Email <Email subject="Licensing" /> with any questions about licensing.
      </p>
    </>
  );
}
