## <h1 align="center">CPL Inventory Management System</h1>
<p>
    Inventory management system for Jumpstart in accordance to CPL module in Lithan Educlaas.
</p>

## Overview
Inventory management system for Jumpstart which has the following features:
<strong>NOTE: </strong> This project is currently on progress and thus the highlighted are the only ones finished as of
11/13/22!
- `Authentication and Authorization`
- Real-time monitoring and managing of sales
- `Monitoring and managing suppliers information`
- `Sorting product via categories`
- `Manage multiple branches stocks`
- `Manage retail branches`
- `Employee management`
- `Profile management`

## Technologies Used
- Laravel UI React
- Laravel for API
- ERDPlus for ERD
- AxureRP for Wireframes
- MySQL for Database Server
- MySQL workbench for MySQL GUI

## Libraries Used
- PHPOpenSourceSaver/JWTAuth for JWT
- MomentJs for date format
- Bootstrap 5 for CSS
- intlTelInput for contact number

## TODO: 
After cloning the repository you are expected to:
- Perform migration via `php artisan migrate`
- Generate sample data via `php artisan generate:sampledata`
- Run the server via `php artisan serve`
- [Optional] Run Vite to run ReactJs via `npm run dev`
 
## Conceptual Design
--ERD and EERD here--

## Roles
<table>
  <tr>
    <th>Role</th>
    <th>Role Description</th>
  </tr>
  <tr>
    <td>ROLE_ADMIN</td>
    <td>Admin role for the inventory management. has access to: Products/Category/Dashboard/Employee/Suppliers/Stores/Stocks</td>
  </tr>
  <tr>
    <td>ROLE_STORE_OWNER</td>
    <td>Store owner role for the inventory management. has access to: Sales/Employee/Dashboard/Stocks</td>
  </tr>
  <tr>
    <td>ROLE_EMPLOYEE</td>
    <td>Employee role for the inventory management has access to: Sales/Stocks</td>
  </tr>
</table>

## Sample Entities

<table>
  <tr>
    <th>Role</th>
    <th>Email</th>
    <th>Password</th>
  </tr>
  <tr>
    <td>ROLE_ADMIN</td>
    <td>admin@gmail.com</td>
    <td>wasd</td>
  </tr>
  <tr>
    <td>ROLE_STORE_OWNER</td>
    <td>jsmith@gmail.com</td>
    <td>wasd</td>
  </tr>
  <tr>
    <td>ROLE_EMPLOYEE</td>
    <td>johndoe@gmail.com</td>
    <td>wasd</td>
  </tr>
</table>

## Demonstration 
--video here--
--screenshots here--

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 2000 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Cubet Techno Labs](https://cubettech.com)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[Many](https://www.many.co.uk)**
- **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
- **[DevSquad](https://devsquad.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[OP.GG](https://op.gg)**
- **[WebReinvent](https://webreinvent.com/?utm_source=laravel&utm_medium=github&utm_campaign=patreon-sponsors)**
- **[Lendio](https://lendio.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
