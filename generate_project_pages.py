import json
import os

def load_projects():
    with open('projects.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def generate_project_page(project):
    # Convert tags and categories to HTML
    tags_html = ''.join([f'<span class="px-2 py-1 text-sm rounded-full bg-gray-700/50">{tag}</span>' for tag in project.get('tags', [])])
    categories_html = ''.join([f'<span class="px-2 py-1 text-sm rounded-full bg-blue-700/50">{category}</span>' for category in project.get('categories', [])])
    
    # Generate media HTML
    media_html = ''
    for media in project.get('media', []):
        if media['type'] == 'image':
            media_html += f'''
            <div class="mb-6">
                <img src="/{media['url']}" alt="{media['alt']}" class="rounded-lg shadow-lg  max-h-[800px] object-contain mx-auto">
                <p class="text-gray-400 mt-2 text-center">{media['caption']}</p>
            </div>
            '''
        elif media['type'] == 'video':
            media_html += f'''
            <div class="mb-6">
                <video controls class="rounded-lg shadow-lg max-h-[800px] object-contain mx-auto">
                    <source src="/{media['url']}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <p class="text-gray-400 mt-2 text-center">{media['caption']}</p>
            </div>
            '''
        elif media['type'] == 'embedded':
            media_html += f'''
            <div class="mb-6">
                <div class="rounded-lg overflow-hidden">
                    {media['url']}
                </div>
                <p class="text-gray-400 mt-2 text-center">{media['caption']}</p>
            </div>
            '''

    # Generate functionality HTML
    functionality_html = ''
    for func in project.get('functionality', []):
        functionality_html += f'''
        <div class="mb-4 pl-4">
            <h4 class="text-lg font-semibold text-blue-400">{func['featureName']}</h4>
            <p class="text-gray-300">{func['description']}</p>
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

    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{project['title']} - Project Details</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
</head>
<body class="min-h-screen bg-gray-900 text-gray-200">
    <nav class="fixed top-0 w-full backdrop-blur-lg z-40">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">F.</a>
            <div class="flex gap-6">
                <a href="/#projects" class="hover:text-blue-500 transition-colors">Projects</a>
                <a href="/#skills" class="hover:text-blue-500 transition-colors">Skills</a>
                <a href="/contact.html" class="hover:text-blue-500 transition-colors">Contact</a>
            </div>
        </div>
    </nav>

    <main class="container mx-auto px-6 pt-24 pb-12">
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
                <p class="text-xl text-gray-300 mb-4">{project['description']}</p>
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

            <section class="mb-12">
                <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Challenges & Solutions
                </h2>
                {challenges_html}
            </section>

            <section class="flex gap-4">
                {f'<a href="{project["repository"]}" class="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"><i class="fab fa-github"></i><span>Repository</span></a>' if project.get('repository') else ''}
                {f'<a href="{project["linkToProject"]}" class="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"><i class="fas fa-external-link-alt"></i><span>Live Demo</span></a>' if project.get('linkToProject') else ''}
            </section>
        </div>
    </main>

    <footer class="py-12 border-t border-blue-900">
        <div class="container mx-auto px-6 text-center text-gray-400">
            <p>© 2024 Faisal. All rights reserved.</p>
        </div>
    </footer>
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

def main():
    projects = load_projects()
    for project in projects:
        generate_project_page(project)
    print("Project pages generated successfully!")

if __name__ == "__main__":
    main()