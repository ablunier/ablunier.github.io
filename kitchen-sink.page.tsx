export const id = "kitchen-sink";
export const lang = "en";
export const title = "Kitchen Sink";
export const layout = "layouts/main.tsx";

export default () => {
  const colorTokens = [
    'bg', 'bg-subtle', 'bg-code', 'text-primary', 'text-secondary', 'text-code', 'accent', 'accent-hover', 'border', 'border-subtle'
  ];

  return (
    <>
      <article class="mt-4">
        <h1>Kitchen Sink</h1>

        <section class="mt-2" style="max-width: 48rem;">
          <h2>Typography</h2>

          <h1>Heading 1: Lorem ipsum dolor sit amet</h1>
          <h2>Heading 2: Lorem ipsum dolor sit amet</h2>
          <h3>Heading 3: Lorem ipsum dolor sit amet</h3>
          <h4>Heading 4: Lorem ipsum dolor sit amet</h4>
          <h5>Heading 5: Lorem ipsum dolor sit amet</h5>
          <h6>Heading 6: Lorem ipsum dolor sit amet</h6>

          <p>
            This is a paragraph of text. It should be styled according to the site's typography rules.
            It also has a <a href="#">link</a> to demonstrate link styling, and some <strong>bold text</strong> and <em>italic text</em>.
            It is also important to include a <code>code snippet</code> within the paragraph to show how inline code is styled.
          </p>
          <blockquote>
            <p>This is a blockquote. It should be styled differently from regular text.</p>
          </blockquote>
          <ul>
            <li>Unordered list item 1</li>
            <li>Unordered list item 2</li>
            <li>Unordered list item 3</li>
          </ul>
          <ol>
            <li>Ordered list item 1</li>
            <li>Ordered list item 2</li>
            <li>Ordered list item 3</li>
          </ol>
          <small>This is small text.</small>
          <pre>
            <code>
              // This is a big code portion<br />
              import lume from "lume/mod.ts";<br />
              const site = lume();<br />
              export default site;
            </code>
            </pre>
        </section>

        <section class="mt-2">
          <h2>Colors</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
            {colorTokens.map((token) => (
              <div key={token} style={`background-color: var(--${token}); width: 100px; height: 100px; border: 1px solid var(--border);`}>
                <span style="background-color: var(--bg); color: var(--text-primary);">--{token}</span>
              </div>
            ))}
          </div>
        </section>

        <section class="mt-2">
          <h2>Images</h2>
          <img src="https://picsum.photos/800/600" alt="Placeholder Image" />

          <figure>
            <img src="https://picsum.photos/400/300" alt="Placeholder Image" />
            <figcaption>Figure 1: This is a caption for the image.</figcaption>
          </figure>
        </section>

        <section class="mt-2">
          <h2>Tables</h2>
          <table>
            <thead>
              <tr>
                <th>Header 1</th>
                <th>Header 2</th>
                <th>Header 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Row 1, Cell 1</td>
                <td>Row 1, Cell 2</td>
                <td>Row 1, Cell 3</td>
              </tr>
              <tr>
                <td>Row 2, Cell 1</td>
                <td>Row 2, Cell 2</td>
                <td>Row 2, Cell 3</td>
              </tr>
            </tbody>
          </table>
        </section>
      </article>
    </>
  );
};
