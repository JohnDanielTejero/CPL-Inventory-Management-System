<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $primaryKey = 'stores_id';
    protected $fillable = [
        'Store_Name',
        'Store_Desc',
    ];

    public function user()
    {
        return $this->hasMany(User::class);
    }

    public function stock()
    {
        return $this->hasMany(Stock::class);
    }
}
