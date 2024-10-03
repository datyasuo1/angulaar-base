###

# Step to build this project:

# Image not found, run:

docker pull 10.60.156.72/xap/node:latest

# In ioc-v3-fe-deployment.yaml file, change tag's name:

harbor.smartcity-cloud.org/ioc/iocv3-webapp:0.0.1 -> image: harbor.smartcity-cloud.org/ioc/iocv3-webapp:0.0.2

# Run command:

docker build -t harbor.smartcity-cloud.org/ioc/iocv3-webapp:0.0.2 .
docker push harbor.smartcity-cloud.org/ioc/iocv3-webapp:0.0.2

# Open lens and navigate to project:

cd Desktop\Viettel\code\iocv3-angular17
kubectl.exe apply -f .\cicd\dev\ioc-v3-fe-deployment.yaml

###

# Written by Lê Đặng Trường Đạt (446353) - email: datldt@viettel.com.vn - phone number: 0384167161

# <h1>Your commitment to coding conventions ensures that others can easily grasp your work and contributes to the scalability and maintainability of the product.</h1>

# Software developers should read the code conventions before developing a product to ensure that the product remains easy to maintain, extend, and develop:

# 1. Source code structure

The source code includes the following folders:

-   base: contains base components for other components to inherit.

-   components: contains the required system components including core and common components.

-   constants: contains system constants files.

-   interceptors: defines the AuthInterceptor class which implements the HttpInterceptor interface from Angular's HTTP client. The AuthInterceptor class has a method called intercept(), which modifies outgoing HTTP requests by adding headers and handles any errors that occur during the request.

-   interface: contains pre-defined common interfaces.

-   js: contains regular JavaScript files, often libraries for performing specific tasks.

-   layout: contains system layouts, configurations, footer, header, top bar, and side bar of the system.

-   pages: contains various pages of the system. Typically, each page will have its own specific components. If necessary, define these specific components within the page's folder. For example, in the department management page, tasks such as updating or adding a new department may require a modal, and you want to extract this modal as a separate component to keep the component concise and understandable. In this case, create these modal components within the folder that contains that specific page.

-   pipes: contains pre-defined Angular pipes.

-   service: contains pre-defined services, mainly for calling APIs of this system.

-   utils: contains functions for handling common logic used across the system. The names of utils should be clear and easily understandable.

-   assets: contains folders for languages, system layout (scss, theme), and images used in the system.

# 2. Components

-   All components are developed based on PrimeNG, so we should refer to the PrimeNG documentation when creating new components or making modifications to existing ones.

-   All app components should be defined in the 'components' folder. You should check if the components you need already exist in this folder before developing a new component.

-   Avoid modifying components to serve a single, specific purpose or a particular page without any shared functionality.

-   The component names should follow the kebab-case convention. These names should be concise and easily understandable for other developers. If the component name is 'card,' it should be used as <app-card>.

-   Events should start with 'on,' for example, onChange, onClick, and event handling functions should start with 'handle,' for example, handleChange, handleClick. If custom component props are related to the props of PrimeNG components, they should have the same names. For example, if a PrimeNG component has a 'label' prop, your custom component based on the PrimeNG component should also have a 'label' prop.

-   Common components should be as concise as possible, easy to understand, and easy to use. Components for a single page should also be concise. If a page becomes too long, consider shortening it by breaking it into smaller components.

-   Read existing components to gain a better understanding and develop components in a consistent manner.

# 3. Naming Conventions

-   Variable and function names should follow the camelCase convention. For example, firstName, lastName, handleClick.

-   Use PascalCase for class names. For example, CardComponent, AppInputComponent.

-   Folder and file names must convey their intentions clearly.

-   Names should be consistent using the same pattern, addressing the file's feature first and then its type, separated by a dot. The pattern is [feature].[type].ts, where 'type' includes options like .service, .component, .pipe, .module, and .directive. For example: consultation.component.ts, home.component.html, auth.service.ts.

-   If you want to add more descriptive names to your files, use a hyphen "-" to separate words in the name. For example, book-appointment.component.ts.

# 4. Angular Coding Style

-   File and code length should not exceed a limit of 400 lines. Each function or piece of code should not exceed 75 lines, adhering to the small function rule.

-   Use arrow functions (=>) to define methods within a class.

-   If the values of variables do not change, they should be declared with const.

-   Do not leave console.log statements in the code when pushing it to the repository, and avoid unnecessary or redundant code comments.

-   Proactively fix bugs when discovered instead of hiding them, as they can affect the entire system.

-   When styling components, avoid applying global styles to prevent affecting other components or parts of the system. The system uses variables to define colors, and when styling components, it's essential to use these variables to ensure consistency across different themes and prevent color-related issues.

-   Refer to PrimeFlex for predefined CSS classes that serve component styling purposes.

# IOCv3

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
