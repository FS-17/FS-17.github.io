import json
import os
from urllib.parse import quote_plus

mydomain = "https://fs-17.github.io"

def load_projects(path='projects.json'):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def convert_bold_text(text):
    # Replace text between asterisks with bold tags
    parts = text.split('*')
    result = ''
    for i in range(len(parts)):
        if i % 2 == 0:
            result += parts[i]
        else:
            result += f'<strong class="font-bold text-blue-400">{parts[i]}</strong>'
    return result

def generate_project_page(project):
    # Sanitize project title for use in meta title if metaTitle is not provided
    meta_title = project.get('metaTitle', f"{project['title']} - Project Details")

    # Convert tags and categories to HTML
    tags_html = ''.join([f'<span class="px-2 py-1 text-sm rounded-full bg-gray-700/50">{tag}</span>' for tag in project.get('tags', [])])
    categories_html = ''.join([f'<span class="px-2 py-1 text-sm rounded-full bg-blue-700/50">{category}</span>' for category in project.get('categories', [])])

    # Generate media HTML with grid for portrait images
    media_html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">'
    current_row = []
    
    for media in project.get('media', []):
        if media['type'] == 'image':
            media_item = f'''
            <div class="mb-6">
                <img src="{media['url']}" alt="{media['alt']}" class="rounded-lg shadow-lg max-h-[800px] object-contain mx-auto" onload="checkImageRatio(this)">
                <p class="text-gray-400 mt-2 text-center">{media['caption']}</p>
            </div>
            '''
            media_html += media_item
        elif media['type'] == 'video':
            media_html += f'''
            <div class="mb-6 col-span-2">
                <video controls class="rounded-lg shadow-lg max-h-[800px] object-contain mx-auto">
                    <source src="{media['url']}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <p class="text-gray-400 mt-2 text-center">{media['caption']}</p>
            </div>
            '''
        elif media['type'] == 'embedded':
            media_html += f'''
            <div class="mb-6 col-span-2">
                <div class="rounded-lg overflow-hidden">
                    {media['url']}
                </div>
                <p class="text-gray-400 mt-2 text-center">{media['caption']}</p>
            </div>
            '''
    
    media_html += '</div>'

    # Generate functionality HTML with bold text support
    functionality_html = ''
    for func in project.get('functionality', []):
        functionality_html += f'''
        <div class="mb-4 pl-4">
            <h4 class="text-lg font-semibold text-blue-400">{func['featureName']}</h4>
            <p class="text-gray-300">{convert_bold_text(func['description'])}</p>
        </div>
        '''

    # Generate challenges HTML
    challenges_html = ''
    for challenge in project.get('challenges', []):
        challenges_html += f'''
        <div class="mb-4 pl-4">
            <p class="text-gray-300"><span class="font-semibold text-blue-400">Challenge:</span> {challenge.get('challenge', '')}</p>
            <p class="text-gray-300"><span class="font-semibold text-blue-400">Solution:</span> {challenge.get('solution', '')}</p>
        </div>
        '''

    # Add JavaScript for checking image ratios
    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{meta_title}</title>

    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-89PH1LB9RX"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {{
        dataLayer.push(arguments);
      }}
      gtag("js", new Date());

      gtag("config", "G-89PH1LB9RX");
    </script>

    <meta name="description" content="{project.get('metaDescription', project.get('shortDescription', ''))}">
    <meta name="keywords" content="{', '.join(project.get('keywords', []))}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <link rel="canonical" href="{mydomain}{project['projectPage']}">
    <style>
      body {{ font-family: 'Segoe UI', sans-serif; }}
      /* ...copy all navbar/menu CSS from index.html... */
      .bg-gradient-to-r {{ background-image: linear-gradient(to right, var(--tw-gradient-stops)); }}
      .bg-clip-text {{ -webkit-background-clip: text; background-clip: text; color: transparent; }}
      nav {{ transition: all 0.3s ease; }}
      nav.scrolled {{ box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); border-bottom: 1px solid rgba(59, 130, 246, 0.2); }}
      nav.mobile-menu-open {{ box-shadow: none !important; border-bottom: none !important; }}
      nav .nav-link {{ position: relative; padding: 0.5rem 0; transition: all 0.3s ease; }}
      nav .nav-link::after {{ content: ""; position: absolute; width: 0; height: 2px; bottom: 0; left: 0; background: linear-gradient(to right, #3b82f6, #06b6d4); transition: width 0.3s ease; transform-origin: left; }}
      nav .nav-link:hover::after, nav .nav-link.active::after {{ width: 100%; }}
      nav .nav-link:hover {{ transform: translateY(-2px); }}
      .nav-logo {{ position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; }}
      .nav-logo > span {{ transition: transform 0.3s ease; }}
      .nav-logo:hover > span {{ transform: scale(1.1); }}
      #mobile-menu {{ background: rgba(31, 41, 55, 0); backdrop-filter: blur(16px) saturate(120%); border-bottom: 1px solid rgba(59, 130, 246, 0.08); opacity: 0; transform: translateY(-32px) scale(0.96); pointer-events: none; transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), filter 0.35s cubic-bezier(0.4, 0, 0.2, 1); filter: blur(8px); box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.1); border-bottom: 1px solid rgba(59, 130, 246, 0.2); }}
      #mobile-menu.open {{ opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; filter: blur(0); animation: menuFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1); }}
      @media (min-width: 768px) {{ #mobile-menu {{ display: none !important; }} }}
      #mobile-menu .container > a {{ opacity: 0; transform: translateY(20px); transition: opacity 0.3s, transform 0.3s; }}
      #mobile-menu.open .container > a {{ opacity: 1; transform: translateY(0); }}
      #mobile-menu.open .container > a:nth-child(1) {{ transition-delay: 0.1s; }}
      #mobile-menu.open .container > a:nth-child(2) {{ transition-delay: 0.18s; }}
      #mobile-menu.open .container > a:nth-child(3) {{ transition-delay: 0.26s; }}
      #mobile-menu.open .container > a:nth-child(4) {{ transition-delay: 0.34s; }}
      @keyframes menuFadeIn {{ from {{ opacity: 0; transform: translateY(-32px) scale(0.96); }} to {{ opacity: 1; transform: translateY(0) scale(1); }} }}
      #mobile-menu-button {{ position: relative; width: 30px; height: 24px; border: none; background: transparent; cursor: pointer; padding: 0; }}
      .hamburger-line {{ position: absolute; left: 0; width: 100%; height: 3px; background-color: currentColor; border-radius: 2px; transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, top 0.3s ease-in-out; }}
      .hamburger-line-1 {{ top: 0; }}
      .hamburger-line-2 {{ top: 50%; transform: translateY(-50%); }}
      .hamburger-line-3 {{ top: 100%; transform: translateY(-100%); }}
      #mobile-menu-button.is-active .hamburger-line-1 {{ top: 50%; transform: translateY(-50%) rotate(45deg); }}
      #mobile-menu-button.is-active .hamburger-line-2 {{ opacity: 0; }}
      #mobile-menu-button.is-active .hamburger-line-3 {{ top: 50%; transform: translateY(-50%) rotate(-45deg); }}
    </style>
    <script>
      function checkImageRatio(img) {{
        if (img.naturalHeight / img.naturalWidth <= 0.75) {{
          img.closest('.mb-6').classList.add('col-span-2');
        }}
      }}
    </script>
</head>
<body class="min-h-screen bg-gray-900 text-gray-200 overflow-x-hidden">
    <!-- Accessibility: Add skip link for screen readers -->
    <a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>
    <header role="banner">
      <nav class="fixed top-0 w-full backdrop-blur-lg z-40" role="navigation" aria-label="Main navigation">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" class="nav-logo" aria-label="Go to homepage">
            <span class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text">F.</span>
          </a>
          <button id="mobile-menu-button" class="md:hidden text-gray-200 focus:outline-none" aria-label="Toggle menu" aria-expanded="false">
            <span class="hamburger-line hamburger-line-1"></span>
            <span class="hamburger-line hamburger-line-2"></span>
            <span class="hamburger-line hamburger-line-3"></span>
          </button>
          <div class="hidden md:flex gap-6">
            <a href="/#projects" class="hover:text-blue-500 transition-colors nav-link">Projects</a>
            <a href="/#skills" class="hover:text-blue-500 transition-colors nav-link">Skills</a>
            <a href="/contact.html" class="hover:text-blue-500 transition-colors nav-link">Contact</a>
            <a href="/ar{project['projectPage']}" class="hover:text-blue-500 transition-colors nav-link">عربي</a>
          </div>
        </div>
        <div id="mobile-menu" class="hidden bg-gray-800/95 backdrop-blur-lg w-full py-4 md:hidden">
          <div class="container mx-auto px-6 flex flex-col gap-4 items-center">
            <a href="/#projects" class="hover:text-blue-500 transition-colors text-lg w-full text-center py-2">Projects</a>
            <a href="/#skills" class="hover:text-blue-500 transition-colors text-lg w-full text-center py-2">Skills</a>
            <a href="/contact.html" class="hover:text-blue-500 transition-colors text-lg w-full text-center py-2">Contact</a>
            <a href="/ar{project['projectPage']}" class="hover:text-blue-500 transition-colors text-lg w-full text-center py-2">عربي</a>
          </div>
        </div>
      </nav>
    </header>
    <main id="main-content" class="container mx-auto px-6 pt-24 pb-12">
        <div class="max-w-4xl mx-auto">
            <header class="mb-12">
                <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    {project['title']}
                </h1>
                <div class="text-gray-400 mb-4">
                    <i class="far fa-calendar-alt mr-2"></i>
                    {project.get('date', 'Date not specified')}
                </div>
                <div class="flex flex-wrap gap-2 mb-4">
                    {categories_html}
                </div>
                <p class="text-xl text-gray-300 mb-4">{convert_bold_text(project['description'])}</p>
                <div class="flex flex-wrap gap-2">
                    {tags_html}
                </div>
            </header>

            <section class="mb-12">
                {media_html}
            </section>

            <section class="mb-12">
                <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Features & Functionality
                </h2>
                {functionality_html}
            </section>

            <section class="mb-12">
                <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Technical Details
                </h2>
                <div class="grid md:grid-cols-2 gap-6">
                    {' '.join([f"""
                    <div class="pl-4">
                        <h3 class="text-lg font-semibold mb-3 text-blue-400">{key.title()}</h3>
                        <ul class="list-disc list-inside text-gray-300">
                            {' '.join([f"<li>{item}</li>" for item in value if item])}
                        </ul>
                    </div>
                    """ for key, value in project.get('technicalDetails', {}).items() if value])}
                </div>
            </section>

            <section class="mb-12">
                <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Design
                </h2>
                <div class="grid gap-6">
                    {f'''
                    <div class="mb-4 pl-4">
                        <h3 class="text-lg font-semibold mb-3 text-blue-400">Aesthetic</h3>
                        <p class="text-gray-300">{project.get('design', {}).get('aesthetic', '')}</p>
                    </div>
                    ''' if project.get('design', {}).get('aesthetic') else ''}

                    {f'''
                    <div class="mb-4 pl-4">
                        <h3 class="text-lg font-semibold mb-3 text-blue-400">Color Palette</h3>
                        <div class="flex flex-wrap gap-2">
                            {' '.join([f'<div class="w-12 h-12 rounded-lg" style="background-color: {color}"></div>' for color in project.get('design', {}).get('colorPalette', [])])}
                        </div>
                    </div>
                    ''' if project.get('design', {}).get('colorPalette') else ''}

                    {f'''
                    <div class="mb-4 pl-4">
                        <h3 class="text-lg font-semibold mb-3 text-blue-400">Typography</h3>
                        <ul class="list-disc list-inside text-gray-300">
                            {' '.join([f'<li>{font}</li>' for font in project.get('design', {}).get('typography', [])[:3]])}
                        </ul>
                    </div>
                    ''' if project.get('design', {}).get('typography') else ''}

                    {f'''
                    <div class="mb-4 pl-4">
                        <h3 class="text-lg font-semibold mb-3 text-blue-400">Responsiveness</h3>
                        <p class="text-gray-300">{project.get('design', {}).get('responsiveness', '')}</p>
                    </div>
                    ''' if project.get('design', {}).get('responsiveness') else ''}

                    {f'''
                    <div class="mb-4 pl-4">
                        <h3 class="text-lg font-semibold mb-3 text-blue-400">Accessibility</h3>
                        <p class="text-gray-300">{project.get('design', {}).get('accessibility', '')}</p>
                    </div>
                    ''' if project.get('design', {}).get('accessibility') else ''}
                </div>
            </section>

            {f'''
            <section class="mb-12">
                <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Challenges & Solutions
                </h2>
                {challenges_html}
            </section>
            ''' if challenges_html.strip() else ''}

            <section class="flex gap-4">
                {f'<a href="{project["repository"]}" class="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"><i class="fab fa-github"></i><span>Repository</span></a>' if project.get('repository') else ''}
                {f'<a href="{project["linkToProject"]}" class="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"><i class="fas fa-external-link-alt"></i><span>Live Demo</span></a>' if project.get('linkToProject') else ''}
            </section>

            <section class="flex flex-col items-center gap-6 mt-16 mb-12">
                <div class="text-center">
                    <p class="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Ready to start your own project?
                    </p>
                    <a href="/contact.html" 
                       class="group relative inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 text-white font-semibold transition-all duration-300 hover:border-blue-500/40 hover:from-blue-600/20 hover:to-cyan-500/20 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105">
                        <span class="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                            Start Your Project Now
                        </span>
                        <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform text-blue-500"></i>
                    </a>
                </div>
            </section>
        </div>
    </main>

    <footer class="py-12 border-t border-blue-900">
        <div class="container mx-auto px-6 text-center text-gray-400">
            <p>© 2025 Faisal. All rights reserved.</p>
        </div>
    </footer>
    <script>
      // --- Begin: Navbar Mobile Menu Script from index.html ---
      function setupNavbar() {{
        const mobileMenuButton = document.getElementById("mobile-menu-button");
        const mobileMenu = document.getElementById("mobile-menu");
        const nav = document.querySelector("nav");
        const navInnerDiv = nav.querySelector(".container");
        // Add scrolled effect
        window.addEventListener("scroll", () => {{
          nav.classList.toggle("scrolled", window.scrollY > 50);
        }});
        // ...existing code for mobile menu...
        if (mobileMenuButton && mobileMenu) {{
          mobileMenuButton.addEventListener("click", () => {{
            const isOpen = mobileMenu.classList.toggle("open");
            mobileMenuButton.classList.toggle("is-active", isOpen);
            nav.classList.toggle("mobile-menu-open", isOpen);
            mobileMenuButton.setAttribute("aria-expanded", isOpen);
            if (isOpen) {{
              mobileMenu.classList.remove("hidden");
              if (navInnerDiv) navInnerDiv.classList.remove("backdrop-blur-lg");
           }} else {{
              setTimeout(() => mobileMenu.classList.add("hidden"), 350);
              if (navInnerDiv) navInnerDiv.classList.add("backdrop-blur-lg");
            }}
          }});
          const mobileLinks = mobileMenu.querySelectorAll("a");
          mobileLinks.forEach((link) => {{
            link.addEventListener("click", () => {{
              mobileMenu.classList.remove("open");
              mobileMenuButton.classList.remove("is-active");
              nav.classList.remove("mobile-menu-open");
              mobileMenuButton.setAttribute("aria-expanded", "false");
              setTimeout(() => mobileMenu.classList.add("hidden"), 350);
              if (navInnerDiv) navInnerDiv.classList.add("backdrop-blur-lg");
            }});
          }});
        }}
      }}
      document.addEventListener("DOMContentLoaded", setupNavbar);
      // --- End: Navbar Mobile Menu Script from index.html ---
    </script>
</body>
</html>
'''

    # Create projects directory if it doesn't exist
    if not os.path.exists('projects'):
        os.makedirs('projects')

    # Generate the file path from the projectPage property
    if project.get('projectPage'):
        file_path = project['projectPage'].lstrip('/')  # Remove leading slash
        # Create subdirectories if they don't exist
        os.makedirs(os.path.dirname(f'{file_path}'), exist_ok=True)
        # Write the HTML file
        with open(f'{file_path}', 'w', encoding='utf-8') as f:
            f.write(html_content)
    
    print(f"{mydomain}{project['projectPage']}\n")


def generate_project_page_arabic(project):
    # Sanitize project title for use in meta title if metaTitle is not provided
    meta_title = project.get('metaTitle', f"{project['title']} - Project Details")

    # Convert tags and categories to HTML
    tags_html = ''.join([f'<span class="px-2 py-1 text-sm rounded-full bg-gray-700/50">{tag}</span>' for tag in project.get('tags', [])])
    categories_html = ''.join([f'<span class="px-2 py-1 text-sm rounded-full bg-blue-700/50">{category}</span>' for category in project.get('categories', [])])

    # Generate media HTML with grid for portrait images
    media_html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">'
    current_row = []
    
    for media in project.get('media', []):
        if media['type'] == 'image':
            media_item = f'''
            <div class="mb-6">
                <img src="{media['url']}" alt="{media['alt']}" class="rounded-lg shadow-lg max-h-[800px] object-contain mx-auto" onload="checkImageRatio(this)">
                <p class="text-gray-400 mt-2 text-center">{media['caption']}</p>
            </div>
            '''
            media_html += media_item
        elif media['type'] == 'video':
            media_html += f'''
            <div class="mb-6 col-span-2">
                <video controls class="rounded-lg shadow-lg max-h-[800px] object-contain mx-auto">
                    <source src="{media['url']}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <p class="text-gray-400 mt-2 text-center">{media['caption']}</p>
            </div>
            '''
        elif media['type'] == 'embedded':
            media_html += f'''
            <div class="mb-6 col-span-2">
                <div class="rounded-lg overflow-hidden">
                    {media['url']}
                </div>
                <p class="text-gray-400 mt-2 text-center">{media['caption']}</p>
            </div>
            '''
    
    media_html += '</div>'

    # Generate functionality HTML with bold text support
    functionality_html = ''
    for func in project.get('functionality', []):
        functionality_html += f'''
        <div class="mb-4 pl-4">
            <h4 class="text-lg font-semibold text-blue-400">{func['featureName']}</h4>
            <p class="text-gray-300">{convert_bold_text(func['description'])}</p>
        </div>
        '''


    # Generate challenges HTML
    challenges_html = ''
    for challenge in project.get('challenges', []):
        challenges_html += f'''
        <div class="mb-4 pl-4">
            <p class="text-gray-300"><span class="font-semibold text-blue-400">تحدي:</span> {challenge.get('challenge', '')}</p>
            <p class="text-gray-300"><span class="font-semibold text-blue-400">حل:</span> {challenge.get('solution', '')}</p>
        </div>
        '''

    # Add JavaScript for checking image ratios
    html_content = f'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{meta_title}</title>

    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-89PH1LB9RX"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {{
        dataLayer.push(arguments);
      }}
      gtag("js", new Date());

      gtag("config", "G-89PH1LB9RX");
    </script>

    <meta name="description" content="{project.get('metaDescription', project.get('shortDescription', ''))}">
    <meta name="keywords" content="{', '.join(project.get('keywords', []))}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap" rel="stylesheet">
    <link rel="canonical" href="{mydomain}{project['projectPage']}">
    <script>
        tailwind.config = {{
          theme: {{
            extend: {{
              fontFamily: {{
                'tajawal': ['Tajawal', 'sans-serif'],
              }},
            }}
          }}
        }}
    </script>
    <style>
      body {{ font-family: 'Tajawal', sans-serif; letter-spacing: 0; line-height: 1.6; }}
      h2 {{ padding: 5px 0; }}
      .bg-gradient-to-r {{ background-image: linear-gradient(to right, var(--tw-gradient-stops)); }}
      .bg-clip-text {{ -webkit-background-clip: text; background-clip: text; color: transparent; }}
      #skills .bg-gray-800\/80 {{ background-color: rgba(31, 41, 55, 0.5); backdrop-filter: blur(10px); border: 1px solid rgba(75, 85, 99, 0.5); }}
      nav {{ transition: all 0.3s ease; }}
      nav.scrolled {{ box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); border-bottom: 1px solid rgba(59, 130, 246, 0.2); }}
      nav.mobile-menu-open {{ box-shadow: none !important; border-bottom: none !important; }}
      nav .nav-link {{ position: relative; padding: 0.5rem 0; transition: all 0.3s ease; }}
      nav .nav-link::after {{ content: ""; position: absolute; width: 0; height: 2px; bottom: 0; right: 0; background: linear-gradient(to left, #3b82f6, #06b6d4); transition: width 0.3s ease; transform-origin: right; }}
      nav .nav-link:hover::after, nav .nav-link.active::after {{ width: 100%; }}
      nav .nav-link:hover {{ transform: translateY(-2px); }}
      .nav-logo {{ position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; }}
      .nav-logo > span {{ transition: transform 0.3s ease; }}
      .nav-logo:hover > span {{ transform: scale(1.1); }}
      #mobile-menu {{ background: rgba(31, 41, 55, 0); backdrop-filter: blur(16px) saturate(120%); border-bottom: 1px solid rgba(59, 130, 246, 0.08); opacity: 0; transform: translateY(-32px) scale(0.96); pointer-events: none; transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), filter 0.35s cubic-bezier(0.4, 0, 0.2, 1); filter: blur(8px); box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.1); border-bottom: 1px solid rgba(59, 130, 246, 0.2); }}
      #mobile-menu.open {{ opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; filter: blur(0); animation: menuFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1); }}
      @media (min-width: 768px) {{ #mobile-menu {{ display: none !important; }} }}
      #mobile-menu .container > a {{ opacity: 0; transform: translateY(20px); transition: opacity 0.3s, transform 0.3s; }}
      #mobile-menu.open .container > a {{ opacity: 1; transform: translateY(0); }}
      #mobile-menu.open .container > a:nth-child(1) {{ transition-delay: 0.1s; }}
      #mobile-menu.open .container > a:nth-child(2) {{ transition-delay: 0.18s; }}
      #mobile-menu.open .container > a:nth-child(3) {{ transition-delay: 0.26s; }}
      #mobile-menu.open .container > a:nth-child(4) {{ transition-delay: 0.34s; }}
      @keyframes menuFadeIn {{ from {{ opacity: 0; transform: translateY(-32px) scale(0.96); }} to {{ opacity: 1; transform: translateY(0) scale(1); }} }}
      #mobile-menu-button {{ position: relative; width: 30px; height: 24px; border: none; background: transparent; cursor: pointer; padding: 0; }}
      .hamburger-line {{ position: absolute; right: 0; width: 100%; height: 3px; background-color: currentColor; border-radius: 2px; transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, top 0.3s ease-in-out; }}
      .hamburger-line-1 {{ top: 0; }}
      .hamburger-line-2 {{ top: 50%; transform: translateY(-50%); }}
      .hamburger-line-3 {{ top: 100%; transform: translateY(-100%); }}
      #mobile-menu-button.is-active .hamburger-line-1 {{ top: 50%; transform: translateY(-50%) rotate(45deg); }}
      #mobile-menu-button.is-active .hamburger-line-2 {{ opacity: 0; }}
      #mobile-menu-button.is-active .hamburger-line-3 {{ top: 50%; transform: translateY(-50%) rotate(-45deg); }}
    </style>
    <script>
      function checkImageRatio(img) {{
        if (img.naturalHeight / img.naturalWidth <= 0.75) {{
          img.closest('.mb-6').classList.add('col-span-2');
        }}
      }}
    </script>
</head>
<body class="min-h-screen bg-gray-900 text-gray-200 overflow-x-hidden font-tajawal">
    <!-- Accessibility: Add skip link for screen readers -->
    <a href="#main-content" class="sr-only focus:not-sr-only">تخطى إلى المحتوى الرئيسي</a>
    <header role="banner">
      <nav class="fixed top-0 w-full backdrop-blur-lg z-40" role="navigation" aria-label="القائمة الرئيسية">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/ar/" class="nav-logo" aria-label="الذهاب للصفحة الرئيسية">
            <span class="text-2xl font-bold bg-gradient-to-r to-blue-500 from-cyan-600 bg-clip-text">ف.</span>
          </a>
          <button id="mobile-menu-button" class="md:hidden text-gray-200 focus:outline-none" aria-label="فتح/إغلاق القائمة" aria-expanded="false">
            <span class="hamburger-line hamburger-line-1"></span>
            <span class="hamburger-line hamburger-line-2"></span>
            <span class="hamburger-line hamburger-line-3"></span>
          </button>
          <div class="hidden md:flex gap-6">
            <a href="/ar/#projects" class="hover:text-blue-500 transition-colors text-lg nav-link">المشاريع</a>
            <a href="/ar/#skills" class="hover:text-blue-500 transition-colors text-lg nav-link">المهارات</a>
            <a href="/ar/contact.html" class="hover:text-blue-500 transition-colors text-lg nav-link">تواصل معي</a>
            <a id="en-link" href="/" class="hover:text-blue-500 transition-colors text-lg nav-link">EN</a>
          </div>
        </div>
        <div id="mobile-menu" class="hidden bg-gray-800/95 backdrop-blur-lg w-full py-4 md:hidden">
          <div class="container mx-auto px-6 flex flex-col gap-4 items-center">
            <a href="/ar/#projects" class="hover:text-blue-500 transition-colors text-lg w-full text-center py-2">المشاريع</a>
            <a href="/ar/#skills" class="hover:text-blue-500 transition-colors text-lg w-full text-center py-2">المهارات</a>
            <a href="/ar/contact.html" class="hover:text-blue-500 transition-colors text-lg w-full text-center py-2">تواصل معي</a>
            <a id="en-link-mobile" href="/" class="hover:text-blue-500 transition-colors text-lg w-full text-center py-2">EN</a>
          </div>
        </div>
      </nav>
    </header>
    <main id="main-content" class="container mx-auto px-6 pt-24 pb-12">
        <div class="max-w-4xl mx-auto">
            <header class="mb-12">
                <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r to-blue-500 from-cyan-600 bg-clip-text text-transparent pb-2">
                    {project['title']}
                </h1>
                <div class="text-gray-400 mb-4">
                    <i class="far fa-calendar-alt mr-2"></i>
                    {project.get('date', 'تاريخ غير محدد')}
                </div>
                <div class="flex flex-wrap gap-2 mb-4">
                    {categories_html}
                </div>
                <p class="text-xl text-gray-300 mb-4">{convert_bold_text(project['description'])}</p>
                <div class="flex flex-wrap gap-2">
                    {tags_html}
                </div>
            </header>

            <section class="mb-12">
                {media_html}
            </section>

            <section class="mb-12">
                <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r to-blue-500 from-cyan-600 bg-clip-text text-transparent">
                    الميزات والوظائف
                </h2>
                {functionality_html}
            </section>

            <section class="mb-12">
                <h2 class="text-2xl
    font-bold mb-6 bg-gradient-to-r to-blue-500 from-cyan-600 bg-clip-text text-transparent">
                        التفاصيل الفنية
                </h2>
                <div class="grid md:grid-cols-2 gap-6">
                    {' '.join([f"""
                    <div class="pl-4">
                        <h3 class="text-lg font-semibold mb-3 text-blue-400">{key.title()}</h3>
                        <ul class="list-disc list-inside text-gray-300">
                            {' '.join([f"<li>{item}</li>" for item in value if item])}
                        </ul>
                    </div>
                    """ for key, value in project.get('technicalDetails', {}).items() if value])}
                </div>
            </section>

            <section class="mb-12">
                <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r to-blue-500 from-cyan-600 bg-clip-text text-transparent">
                    التصميم
                </h2>
                <div class="grid gap-6">
                    {f'''
                    <div class="mb-4 pl-4">
                        <h3 class="text-lg font-semibold mb-3 text-blue-400">الجمالية</h3>
                        <p class="text-gray-300">{project.get('design', {}).get('aesthetic', '')}</p>
                    </div>
                    ''' if project.get('design', {}).get('aesthetic') else ''}

                    {f'''
                    <div class="mb-4 pl-4">
                        <h3 class="text-lg font-semibold mb-3 text-blue-400">لوحة الألوان</h3>
                        <div class="flex flex-wrap gap-2">
                            {' '.join([f'<div class="w-12 h-12 rounded-lg" style="background-color: {color}"></div>' for color in project.get('design', {}).get('colorPalette', [])])}
                        </div>
                    </div>
                    ''' if project.get('design', {}).get('colorPalette') else ''}

                    {f'''
                    <div class="mb-4 pl-4">
                        <h3 class="text-lg font-semibold mb-3 text-blue-400">الخطوط</h3>
                        <ul class="list-disc list-inside text-gray-300">
                            {' '.join([f'<li>{font}</li>' for font in project.get('design', {}).get('typography', [])[:3]])}
                        </ul>
                    </div>
                    ''' if project.get('design', {}).get('typography') else ''}

                    {f'''
                    <div class="mb-4 pl-4">
                        <h3 class="text-lg font-semibold mb-3 text-blue-400">الاستجابة</h3>
                        <p class="text-gray-300">{project.get('design', {}).get('responsiveness', '')}</p>
                    </div>
                    ''' if project.get('design', {}).get('responsiveness') else ''}

                    {f'''
                    <div class="mb-4 pl-4">
                        <h3 class="text-lg font-semibold mb-3 text-blue-400">الوصولية</h3>
                        <p class="text-gray-300">{project.get('design', {}).get('accessibility', '')}</p>
                    </div>
                    ''' if project.get('design', {}).get('accessibility') else ''}
                </div>
            </section>

            {f'''
            <section class="mb-12">
                <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r to-blue-500 from-cyan-600 bg-clip-text text-transparent">
                    التحديات والحلول
                </h2>
                {challenges_html}
            </section>
            ''' if challenges_html.strip() else ''}

            <section class="flex gap-4">
                {f'<a href="{project["repository"]}" class="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"><i class="fab fa-github"></i><span>المستودع</span></a>' if project.get('repository') else ''}
                {f'<a href="{project["linkToProject"]}" class="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"><i class="fas fa-external-link-alt"></i><span>عرض مباشر</span></a>' if project.get('linkToProject') else ''}
            </section>


            <section class="flex flex-col items-center gap-6 mt-16 mb-12">
                <div class="text-center">
                    <p class="text-3xl font-bold mb-4 bg-gradient-to-r to-blue-500 from-cyan-600 bg-clip-text text-transparent pb-1">
                        هل أنت مستعد لبدء مشروعك الخاص؟
                    </p>
                    <a href="/contact.html" 
                       class="group relative inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 text-white font-semibold transition-all duration-300 hover:border-blue-500/40 hover:from-blue-600/20 hover:to-cyan-500/20 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105">
                        <span class="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                            ابدأ مشروعك الآن
                        </span>
                    </a>
                </div>
            </section>
        </div>
    </main>

    <footer class="py-12 border-t border-blue-900">
        <div class="container mx-auto px-6 text-center text-gray-400">
            <p>© 2025 Faisal. جميع الحقوق محفوظة.</p>
        </div>
    </footer>
    <script>
      // --- Begin: Navbar Mobile Menu Script from index.html ---
      function setupNavbar() {{
        const mobileMenuButton = document.getElementById("mobile-menu-button");
        const mobileMenu = document.getElementById("mobile-menu");
        const nav = document.querySelector("nav");
        const navInnerDiv = nav.querySelector(".container");
        // Add scrolled effect
        window.addEventListener("scroll", () => {{
          nav.classList.toggle("scrolled", window.scrollY > 50);
        }});
        // EN link fix
        function setEnLinks() {{
          const enLink = document.getElementById("en-link");
          const enLinkMobile = document.getElementById("en-link-mobile");
          let path = window.location.pathname;
          if (path.startsWith("/ar/")) {{
            let enPath = path.replace(/^\/ar\//, "/");
            if (enPath === "/index.html" || enPath === "/") enPath = "/index.html";
            enLink.setAttribute("href", enPath);
            enLinkMobile.setAttribute("href", enPath);
          }}
        }}
        setEnLinks();
        // ...existing code for mobile menu...
        if (mobileMenuButton && mobileMenu) {{
          mobileMenuButton.addEventListener("click", () => {{
            const isOpen = mobileMenu.classList.toggle("open");
            mobileMenuButton.classList.toggle("is-active", isOpen);
            nav.classList.toggle("mobile-menu-open", isOpen);
            mobileMenuButton.setAttribute("aria-expanded", isOpen);
            if (isOpen) {{
              mobileMenu.classList.remove("hidden");
              if (navInnerDiv) navInnerDiv.classList.remove("backdrop-blur-lg");
           }} else {{
              setTimeout(() => mobileMenu.classList.add("hidden"), 350);
              if (navInnerDiv) navInnerDiv.classList.add("backdrop-blur-lg");
            }}
          }});
          const mobileLinks = mobileMenu.querySelectorAll("a");
          mobileLinks.forEach((link) => {{
            link.addEventListener("click", () => {{
              mobileMenu.classList.remove("open");
              mobileMenuButton.classList.remove("is-active");
              nav.classList.remove("mobile-menu-open");
              mobileMenuButton.setAttribute("aria-expanded", "false");
              setTimeout(() => mobileMenu.classList.add("hidden"), 350);
              if (navInnerDiv) navInnerDiv.classList.add("backdrop-blur-lg");
            }});
          }});
        }}
      }}
      document.addEventListener("DOMContentLoaded", setupNavbar);
      // --- End: Navbar Mobile Menu Script from index.html ---
    </script>
</body>
</html>
'''

    # Create projects directory if it doesn't exist
    if not os.path.exists('projects/ar'):
        os.makedirs('projects/ar')

    # Generate the file path from the projectPage property
    if project.get('projectPage'):
        file_path = project['projectPage'].lstrip('/')  # Remove leading slash
        # Create subdirectories if they don't exist
        os.makedirs(os.path.dirname(f'{file_path}'), exist_ok=True)
        # Write the HTML file
        with open(f'{file_path}', 'w', encoding='utf-8') as f:
            f.write(html_content)
    
    print(f"{mydomain}{project['projectPage']}\n")



def main():
    # english
    projects = load_projects('projects.json')
    for project in projects:
        generate_project_page(project)

    # arabic
    projects_arabic = load_projects('ar/projects.json')
    for project in projects_arabic:
        generate_project_page_arabic(project)

    print("Project pages generated successfully!")

if __name__ == "__main__":
    main()