<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'Role_Name',
        'Role_Desc',
    ];

    public function User_Roles(){
        return $this->belongsToMany(User_Role::class, 'user__roles', 'role_id');
    }
}
